import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {IoMdHome} from 'react-icons/io'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Header = props => {
  const {history} = props
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  const onClickWebsiteLogo = () => {
    history.push('/')
  }
  return (
    <nav className="navbar-container">
      <Link to="/" className="website-logo-link">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="nav-logo"
          onClick={onClickWebsiteLogo}
        />
      </Link>
      <ul className="nav-link-icon-container">
        <Link to="/" className="link-item">
          <li>
            <IoMdHome className="nav-icon" />
          </li>
        </Link>
        <Link to="/jobs" className="link-item">
          <li>
            <BsFillBriefcaseFill className="nav-icon" />
          </li>
        </Link>

        <li>
          <button
            type="button"
            onClick={onClickLogout}
            className="logout-icon-btn"
          >
            <FiLogOut className="nav-icon" />
          </button>
        </li>
      </ul>
      <ul className="nav-link-text-container">
        <Link to="/" className="link-item">
          <li>
            <p className="nav-text">Home</p>
          </li>
        </Link>
        <Link to="/jobs" className="link-item">
          <li>
            <p className="nav-text">Jobs</p>
          </li>
        </Link>
      </ul>
      <button type="button" className="logout-button" onClick={onClickLogout}>
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
