import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Profile from '../Profile'
import JobCard from '../JobCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE,',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const jwtToken = Cookies.get('jwt_token')

class Jobs extends Component {
  state = {
    profileDetails: {},
    profileApiStatus: apiStatusConstants.initial,
    jobsApiStatus: apiStatusConstants.initial,
    employmentType: [],
    minimumPackage: '',
    search: '',
    jobsList: [],
  }

  componentDidMount() {
    this.getProfile()
    this.getJobs()
  }

  getProfile = async () => {
    this.setState({profileApiStatus: apiStatusConstants.inProgress})
    const profileApi = 'https://apis.ccbp.in/profile'
    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    try {
      const response = await fetch(profileApi, option)
      const fetchedData = await response.json()
      if (response.ok) {
        const updateData = {
          name: fetchedData.profile_details.name,
          profileImageUrl: fetchedData.profile_details.profile_image_url,
          shortBio: fetchedData.profile_details.short_bio,
        }
        this.setState({
          profileDetails: updateData,
          profileApiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({profileApiStatus: apiStatusConstants.failure})
      }
    } catch (e) {
      console.log(e.message)
    }
  }

  getJobs = async () => {
    this.setState({jobsApiStatus: apiStatusConstants.inProgress})
    const {employmentType, minimumPackage, search} = this.state
    const employmentTypeString = employmentType.join(',')
    const jobApiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeString}&minimum_package=${minimumPackage}&search=${search}`
    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    try {
      const response = await fetch(jobApiUrl, option)
      const data = await response.json()
      if (response.ok) {
        const updatedData =
          data.jobs.length > 0
            ? data.jobs.map(eachJob => ({
                companyLogoUrl: eachJob.company_logo_url,
                employmentType: eachJob.employment_type,
                id: eachJob.id,
                jobDescription: eachJob.job_description,
                location: eachJob.location,
                packagePerAnnum: eachJob.package_per_annum,
                rating: eachJob.rating,
                title: eachJob.title,
              }))
            : []
        this.setState({
          jobsList: updatedData,
          jobsApiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({jobsApiStatus: apiStatusConstants.failure})
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

  onClickRetry = () => {
    this.getProfile()
  }

  renderProfileFailure = () => (
    <button type="button" className="retry-button" onClick={this.onClickRetry}>
      Retry
    </button>
  )

  renderProfileSection = () => {
    const {profileApiStatus, profileDetails} = this.state
    switch (profileApiStatus) {
      case apiStatusConstants.success:
        return <Profile profileDetails={profileDetails} />
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.failure:
        return this.renderProfileFailure()
      default:
        return null
    }
  }

  onClickJobFailureRetry = () => this.getJobs()

  renderJobsFailure = () => (
    <div className="jobs-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-title">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.onClickJobFailureRetry}
      >
        Retry
      </button>
    </div>
  )

  renderNoJobsView = () => (
    <li className="no-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-img"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-description">
        We could not find any jobs. Try other filters.
      </p>
    </li>
  )

  renderJobsListCard = () => {
    const {jobsList} = this.state
    return (
      <ul className="jobs-list-container">
        {jobsList.length > 0
          ? jobsList.map(eachJob => (
              <JobCard key={eachJob.id} jobList={eachJob} />
            ))
          : this.renderNoJobsView()}
      </ul>
    )
  }

  renderJobsList = () => {
    const {jobsApiStatus} = this.state
    switch (jobsApiStatus) {
      case apiStatusConstants.failure:
        return this.renderJobsFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderJobsListCard()
      default:
        return null
    }
  }

  onChangeSearchInput = event => {
    this.setState({search: event.target.value})
  }

  onClickSearchIcon = () => {
    this.getJobs()
  }

  onChangeCheckbox = event => {
    const {value, checked} = event.target
    if (checked) {
      this.setState(
        prevState => ({employmentType: [...prevState.employmentType, value]}),
        this.getJobs,
      )
    } else {
      this.setState(
        prevState => ({
          employmentType: prevState.employmentType.filter(
            empType => empType !== value,
          ),
        }),
        this.getJobs,
      )
    }
  }

  onChangeRadio = event => {
    this.setState({minimumPackage: event.target.value}, this.getJobs)
  }

  render() {
    const {search} = this.state
    return (
      <div className="jobs-container">
        <Header />
        <div className="jobs-content">
          <div className="search-input-container sm-search-input-container">
            <input
              className="search-input"
              type="search"
              placeholder="Search"
              value={search}
              onChange={this.onChangeSearchInput}
            />
            <button
              type="button"
              data-testid="searchButton"
              className="search-button"
              onClick={this.onClickSearchIcon}
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
          <div className="left-container">
            <div className="profile-container">
              {this.renderProfileSection()}
            </div>
            <hr className="hr-line" />
            <div className="filters-container">
              <h1 className="filter-heading">Type of Employment</h1>
              <ul className="filter-lists">
                {employmentTypesList.map(empType => (
                  <li key={empType.employmentTypeId} className="list">
                    <input
                      type="checkbox"
                      id={empType.employmentTypeId}
                      value={empType.employmentTypeId}
                      name="employmentType"
                      onChange={this.onChangeCheckbox}
                    />
                    <label
                      htmlFor={empType.employmentTypeId}
                      className="label-text"
                    >
                      {empType.label}
                    </label>
                  </li>
                ))}
              </ul>
              <hr className="hr-line" />
              <h1 className="filter-heading">Salary Range</h1>
              <ul className="filter-lists">
                {salaryRangesList.map(salaryRange => (
                  <li key={salaryRange.salaryRangeId} className="list">
                    <input
                      type="radio"
                      id={salaryRange.salaryRangeId}
                      value={salaryRange.salaryRangeId}
                      name="minimumPackage"
                      onChange={this.onChangeRadio}
                    />
                    <label
                      htmlFor={salaryRange.salaryRangeId}
                      className="label-text"
                    >
                      {salaryRange.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="right-container">
            <div className="search-input-container lg-search-input-container">
              <input
                className="search-input"
                type="search"
                placeholder="Search"
                value={search}
                onChange={this.onChangeSearchInput}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-button"
                onClick={this.onClickSearchIcon}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderJobsList()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
