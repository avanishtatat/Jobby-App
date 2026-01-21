import {Link} from 'react-router-dom'
import {MdStar, MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobCard = props => {
  const {jobList} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobList

  return (
    <Link to={`/jobs/${id}`} className="job-link">
      <li className="job-card">
        <div className="job-profile-section">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo-img"
          />
          <div className="job-details">
            <h1 className="job-role">{title}</h1>
            <div className="job-rating-container">
              <MdStar className="star-icon" />
              <p className="company-rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-other-details">
          <div className="job-details-container">
            <MdLocationOn className="job-details-icon" />
            <p className="job-location">{location}</p>
          </div>

          <div className="job-details-container">
            <BsBriefcaseFill className="job-details-icon" />
            <p className="emp-type">{employmentType}</p>
          </div>

          <p className="ppa-text">{packagePerAnnum}</p>
        </div>
        <hr className="hr-line" />
        <h1 className="job-description">Description</h1>
        <p className="job-description-text">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobCard
