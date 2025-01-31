import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'

import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {MdPlaylistAdd} from 'react-icons/md'

import {IoIosMoon} from 'react-icons/io'
import {IoSunnyOutline, IoCloseSharp} from 'react-icons/io5'
import {GiHamburgerMenu} from 'react-icons/gi'
import {FiLogOut} from 'react-icons/fi'

import ThemeContext from '../../context/ThemeContext'
import './index.css'

const Header = props => (
  <ThemeContext.Consumer>
    {value => {
      const {isLightTheme, onChangeTheme} = value
      const styletype = isLightTheme ? 'light' : 'dark'
      const logoImg = isLightTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
      const themeLogo = isLightTheme ? (
        <IoIosMoon className={`${styletype}-icons`} />
      ) : (
        <IoSunnyOutline className={`${styletype}-icons`} />
      )
      const onChangingTheme = () => {
        onChangeTheme()
      }

      const onLogOut = () => {
        Cookies.remove('jwt_token')
        const {history} = props
        history.replace('/login')
      }

      const getClickedIndex = () => {
        const {location} = props
        const {pathname} = location

        switch (pathname) {
          case '/':
            return 0
          case '/trending':
            return 1
          case '/gaming':
            return 2
          case '/saved-videos':
            return 3
          default:
            return -1
        }
      }

      const clicked = getClickedIndex()

      return (
        <>
          <div className={`header-container ${styletype}-header-small`}>
            <Link className="link" to="/">
              <img className="header-logo" src={logoImg} alt="website logo" />
            </Link>
            <div>
              <button
                data-testid="theme"
                onClick={onChangingTheme}
                type="button"
              >
                {themeLogo}
              </button>
              <Popup
                modal
                trigger={
                  <button type="button">
                    <GiHamburgerMenu className={`${styletype}-icons`} />
                  </button>
                }
              >
                {close => (
                  <div className={`popup-menu popup-menu-${styletype}`}>
                    <button type="button" onClick={() => close()}>
                      <IoCloseSharp
                        className={`${styletype}-icons close-icon`}
                      />
                    </button>
                    <div>
                      <ul className="popup-content">
                        <Link className="link" to="/">
                          <li
                            className={`${
                              clicked === 0 ? 'clicked' : ''
                            } ${styletype}-nav-item small-li`}
                          >
                            <AiFillHome className="icon-sidebar" />
                            <p className={`${styletype}-nav-item`}>Home</p>
                          </li>
                        </Link>
                        <Link className="link" to="/trending">
                          <li
                            className={`${
                              clicked === 1 ? 'clicked' : ''
                            } ${styletype}-nav-item small-li`}
                          >
                            <HiFire className="icon-sidebar" />
                            <p className={`${styletype}-nav-item small-li`}>
                              Trending
                            </p>
                          </li>
                        </Link>
                        <Link className="link" to="/gaming">
                          <li
                            className={`${
                              clicked === 2 ? 'clicked' : ''
                            } ${styletype}-nav-item small-li`}
                          >
                            <SiYoutubegaming className="icon-sidebar" />
                            <p className={`${styletype}-nav-item`}>Gaming</p>
                          </li>
                        </Link>
                        <Link className="link" to="/saved-videos">
                          <li
                            className={`${
                              clicked === 3 ? 'clicked' : ''
                            } ${styletype}-nav-item small-li`}
                          >
                            <MdPlaylistAdd className="icon-sidebar" />
                            <p className={`${styletype}-nav-item`}>
                              Saved Videos
                            </p>
                          </li>
                        </Link>
                      </ul>
                    </div>
                  </div>
                )}
              </Popup>

              <Popup
                modal
                trigger={
                  <button type="button">
                    <FiLogOut className={`${styletype}-icons`} />
                  </button>
                }
              >
                {close => (
                  <div className={`logout-popup-${styletype}`}>
                    <p className={`logout-popup-heading-${styletype}`}>
                      Are you sure, you want to logout
                    </p>
                    <div className="popup-btn-container">
                      <button
                        className="cancel-btn"
                        type="button"
                        onClick={() => close()}
                      >
                        Cancel
                      </button>
                      <button
                        className="confirm-btn"
                        type="button"
                        onClick={onLogOut}
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                )}
              </Popup>
            </div>
          </div>
          <div className={`${styletype}-header-small header-large-container`}>
            <Link to="/" className="link">
              <img className="header-logo" src={logoImg} alt="website logo" />
            </Link>
            <div className="details-container">
              <button
                data-testid="theme"
                onClick={onChangingTheme}
                type="button"
              >
                {themeLogo}
              </button>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                alt="profile"
                className="profile-pic"
              />
              <Popup
                modal
                trigger={
                  <button
                    className={`logout-btn ${styletype}-logout`}
                    type="button"
                  >
                    Logout
                  </button>
                }
              >
                {close => (
                  <div className={`logout-popup-${styletype}`}>
                    <p className={`logout-popup-heading-${styletype}`}>
                      Are you sure, you want to logout
                    </p>
                    <div className="popup-btn-container">
                      <button
                        className="cancel-btn"
                        type="button"
                        onClick={() => close()}
                      >
                        Cancel
                      </button>
                      <button
                        className="confirm-btn"
                        type="button"
                        onClick={onLogOut}
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                )}
              </Popup>
            </div>
          </div>
        </>
      )
    }}
  </ThemeContext.Consumer>
)

export default withRouter(Header)
