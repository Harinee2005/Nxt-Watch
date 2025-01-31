import './index.css'
import {Component} from 'react'

import ThemeContext from '../../context/ThemeContext'

import SideBar from '../SideBar'
import Header from '../Header'

class NotFound extends Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isLightTheme} = value

          const themeClass = isLightTheme ? 'light-theme' : 'dark-theme'
          const imgUrl = isLightTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'

          return (
            <div className="home-container">
              <div className="header">
                <Header />
              </div>
              <div className="home-content-container">
                <div className="home-content">
                  <SideBar />
                </div>

                <div className={`notfound-content ${themeClass}`}>
                  <div className="not-found">
                    <img src={imgUrl} alt="not found" className="no-save-img" />
                    <h1 className={`${themeClass}`}>Page Not Found</h1>
                    <p className="no-search-para">
                      We are sorry, the page you requested could not be found.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default NotFound
