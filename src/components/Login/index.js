import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import ThemeContext from '../../context/ThemeContext'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showPassword: false, errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onShowPassword = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }))
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
      this.setState({
        username: '',
        password: '',
        errorMsg: '',
      })
    } else {
      this.setState({
        errorMsg: `* ${data.error_msg}`,
        username: '',
        password: '',
      })
    }
  }

  render() {
    const {username, password, showPassword, errorMsg} = this.state
    const passType = showPassword ? 'text' : 'password'
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isLightTheme} = value
          const nxtWatchLogo = isLightTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
          const styleName = isLightTheme ? 'light' : 'dark'
          const jwtToken = Cookies.get('jwt_token')

          if (jwtToken !== undefined) {
            return <Redirect to="/" />
          }
          return (
            <div className={`${styleName}-bg`}>
              <form
                onSubmit={this.onSubmitLogin}
                className={`${styleName}-login-container`}
              >
                <img
                  className="logo-image"
                  src={nxtWatchLogo}
                  alt="website logo"
                />
                <div className="input-container">
                  <label className={`${styleName}-label`} htmlFor="username">
                    USERNAME
                  </label>
                  <input
                    className={`${styleName}-input`}
                    id="username"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={this.onChangeUsername}
                  />
                </div>
                <div className="input-container">
                  <label className={`${styleName}-label`} htmlFor="password">
                    PASSWORD
                  </label>
                  <input
                    className={`${styleName}-input`}
                    id="password"
                    type={passType}
                    placeholder="Password"
                    value={password}
                    onChange={this.onChangePassword}
                  />
                </div>
                <div className="show-password">
                  <input
                    onChange={this.onShowPassword}
                    type="checkbox"
                    id="showPassword"
                  />
                  <label
                    className={`${styleName}-label`}
                    htmlFor="showPassword"
                  >
                    Show Password
                  </label>
                </div>
                <button
                  style={{color: '#ffffff'}}
                  className="login-btn"
                  type="submit"
                >
                  Login
                </button>
                <p className="error-msg">{errorMsg}</p>
              </form>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Login
