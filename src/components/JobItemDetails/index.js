import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {MdStar, MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FaExternalLinkAlt} from 'react-icons/fa'
import Header from '../Header'
import SimilarJobs from '../SimilarJobs'
import './index.css'

const jwtToken = Cookies.get('jwt_token')
const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}
class JobItemDetails extends Component {
  state = {jobDetailsObj: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getJobDetails()
  }

  updateJobDetailsData = jobDetails => ({
    companyLogoUrl: jobDetails.company_logo_url,
    companyWebsiteUrl: jobDetails.company_website_url,
    employmentType: jobDetails.employment_type,
    id: jobDetails.id,
    jobDescription: jobDetails.job_description,
    skills: jobDetails.skills.map(eachSkill => ({
      imageUrl: eachSkill.image_url,
      name: eachSkill.name,
    })),
    lifeAtCompany: {
      description: jobDetails.life_at_company.description,
      imageUrl: jobDetails.life_at_company.image_url,
    },
    location: jobDetails.location,
    packagePerAnnum: jobDetails.package_per_annum,
    rating: jobDetails.rating,
    title: jobDetails.title,
  })

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {id} = match.params
    const jobDetailsApi = `https://apis.ccbp.in/jobs/${id}`
    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    try {
      const response = await fetch(jobDetailsApi, option)
      const data = await response.json()
      if (response.ok) {
        const updateData = {
          jobDetails: this.updateJobDetailsData(data.job_details),
          similarJobs: data.similar_jobs.map(similarJob => ({
            companyLogoUrl: similarJob.company_logo_url,
            employmentType: similarJob.employment_type,
            id: similarJob.id,
            jobDescription: similarJob.job_description,
            location: similarJob.location,
            rating: similarJob.rating,
            title: similarJob.title,
          })),
        }
        this.setState({
          jobDetailsObj: updateData,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    } catch (e) {
      console.log(e.message)
    }
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onClickJobDetailsRetry = () => {
    this.getJobDetails()
  }

  renderJobsFailure = () => (
    <div className="jobs-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-title">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.onClickJobDetailsRetry}
      >
        Retry
      </button>
    </div>
  )

  renderJobDetails = () => {
    const {jobDetailsObj} = this.state
    const {jobDetails, similarJobs} = jobDetailsObj
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      skills,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobDetails
    return (
      <>
        <div className="job-details-card">
          <div className="job-details-top-section">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="job-details-company-logo"
            />
            <div className="job-details-role-cotainer">
              <h1 className="job-details-role-heading">{title}</h1>
              <div className="job-details-rating-container">
                <MdStar className="star-icon" />
                <p className="job-details-rating-text">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-details-info-container">
            <div className="job-details-info">
              <MdLocationOn className="job-details-icon" />
              <p className="info-text">{location}</p>
            </div>
            <div className="job-details-info">
              <BsBriefcaseFill className="job-details-icon" />
              <p className="info-text">{employmentType}</p>
            </div>
            <p className="job-details-package-info">{packagePerAnnum}</p>
          </div>
          <hr className="job-details-hr-line" />
          <div className="job-details-description-container">
            <h1 className="job-details-description-heading">Description</h1>
            <a
              href={companyWebsiteUrl}
              className="visit-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="visit-link-container">
                <p className="visit-text">Visit</p>
                <FaExternalLinkAlt />
              </div>
            </a>
          </div>
          <p className="job-details-description-text">{jobDescription}</p>
          <h1 className="job-details-skills-heading">Skills</h1>
          <ul className="job-details-skills-container">
            {skills.map(skill => (
              <li key={skill.name} className="skill-card">
                <img
                  src={skill.imageUrl}
                  alt={skill.name}
                  className="skill-image"
                />
                <p className="skill-name">{skill.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="life-at-company-text">Life at Company</h1>
          <div className="life-at-company-container">
            <p className="life-at-company-description-text">
              {lifeAtCompany.description}
            </p>
            <img
              src={lifeAtCompany.imageUrl}
              alt="life at company"
              className="life-at-company-img"
            />
          </div>
        </div>
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-job-container">
          {similarJobs.map(similarJob => (
            <SimilarJobs key={similarJob.id} similarJob={similarJob} />
          ))}
        </ul>
      </>
    )
  }

  renderJobDetailsPage = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetails()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.failure:
        return this.renderJobsFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="job-item-details-container">
        <Header />
        <div className="job-item-details-content">
          {this.renderJobDetailsPage()}
        </div>
      </div>
    )
  }
}

export default JobItemDetails
