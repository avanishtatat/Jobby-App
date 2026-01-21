import {MdStar, MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobs = props => {
  const {similarJob} = props
  return (
    <li className="similar-job-card">
      <div className="similar-job-logo-container">
        <img
          src={similarJob.companyLogoUrl}
          alt="similar job company logo"
          className="similar-job-company-logo"
        />
        <div className="similar-job-role-container">
          <h1 className="similar-job-role-heading">{similarJob.title}</h1>
          <div className="similar-job-rating-container">
            <MdStar className="star-icon" />
            <p className="similar-job-rating">{similarJob.rating}</p>
          </div>
        </div>
      </div>
      <h1 className="similar-job-description-heading">Description</h1>
      <p className="similar-job-description-text">
        {similarJob.jobDescription}
      </p>
      <div className="similar-job-info-container">
        <div className="info-container">
          <MdLocationOn className="job-details-icon" />
          <p className="info-text">{similarJob.location}</p>
        </div>
        <div className="info-container">
          <BsBriefcaseFill className="job-details-icon" />
          <p className="info-text">{similarJob.employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobs
