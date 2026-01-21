import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {
    user: {
      username: '',
      password: '',
    },
    isError: false,
    errorMsg: '',
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {history} = this.props

    const {user} = this.state
    const loginApi = 'https://apis.ccbp.in/login'
    const option = {
      method: 'POST',
      body: JSON.stringify(user),
    }
    try {
      const response = await fetch(loginApi, option)
      const jsonData = await response.json()
      if (response.ok) {
        const jwtToken = jsonData.jwt_token
        Cookies.set('jwt_token', jwtToken, {expires: 30})
        history.replace('/')
      } else if (response.status === 404 || response.status === 400) {
        this.setState({isError: true, errorMsg: jsonData.error_msg})
      } else {
        this.setState({isError: true, errorMsg: jsonData.error_msg})
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  onChangeUsername = event => {
    this.setState(prevState => ({
      user: {...prevState.user, username: event.target.value},
    }))
  }

  onChangePassword = event => {
    this.setState(prevState => ({
      user: {...prevState.user, password: event.target.value},
    }))
  }

  usernameInputField = () => (
    <>
      <label htmlFor="username" className="input-label">
        USERNAME
      </label>
      <input
        type="text"
        id="username"
        placeholder="Username"
        className="input-field"
        onChange={this.onChangeUsername}
      />
    </>
  )

  passwordInputField = () => (
    <>
      <label htmlFor="password" className="input-label">
        PASSWORD
      </label>
      <input
        type="password"
        id="password"
        placeholder="Password"
        className="input-field"
        onChange={this.onChangePassword}
      />
    </>
  )

  render() {
    const {isError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <div className="login-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <form className="login-form" onSubmit={this.onSubmitForm}>
            <div className="input-container">{this.usernameInputField()}</div>
            <div className="input-container">{this.passwordInputField()}</div>
            <button type="submit" className="login-button">
              Login
            </button>
            {isError && <p className="error-text">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
