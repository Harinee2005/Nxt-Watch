import './index.css'
import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'

import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {MdPlaylistAdd} from 'react-icons/md'

import ThemeContext from '../../context/ThemeContext'

class SideBar extends Component {
  getClickedIndex = () => {
    const {location} = this.props
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

  render() {
    const clicked = this.getClickedIndex()

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isLightTheme} = value
          const styletype = isLightTheme ? 'light' : 'dark'

          return (
            <div className={`sidebar ${styletype}-sidebar`}>
              <ul>
                <Link className="link" to="/">
                  <li
                    className={`${
                      clicked === 0 ? 'clicked' : ''
                    } ${styletype}-nav-item`}
                  >
                    <AiFillHome className="icon-sidebar" />
                    <p className={`${styletype}-nav-item`}>Home</p>
                  </li>
                </Link>
                <Link className="link" to="/trending">
                  <li
                    className={`${
                      clicked === 1 ? 'clicked' : ''
                    } ${styletype}-nav-item`}
                  >
                    <HiFire className="icon-sidebar" />
                    <p className={`${styletype}-nav-item`}>Trending</p>
                  </li>
                </Link>
                <Link className="link" to="/gaming">
                  <li
                    className={`${
                      clicked === 2 ? 'clicked' : ''
                    } ${styletype}-nav-item`}
                  >
                    <SiYoutubegaming className="icon-sidebar" />
                    <p className={`${styletype}-nav-item`}>Gaming</p>
                  </li>
                </Link>
                <Link className="link" to="/saved-videos">
                  <li
                    className={`${
                      clicked === 3 ? 'clicked' : ''
                    } ${styletype}-nav-item`}
                  >
                    <MdPlaylistAdd className="icon-sidebar" />
                    <p className={`${styletype}-nav-item`}>Saved Videos</p>
                  </li>
                </Link>
              </ul>
              <ul>
                <p className={`${styletype}-nav-item`}>CONTACT US</p>
                <div className="logo-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                    alt="facebook logo"
                    className="logo"
                  />
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png "
                    alt="twitter logo"
                    className="logo"
                  />
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                    alt="linked in logo"
                    className="logo"
                  />
                </div>
                <p className={`${styletype}-nav-item`}>
                  Enjoy! Now to see your channels and recommendations!
                </p>
              </ul>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default withRouter(SideBar)
