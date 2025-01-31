import './index.css'
import {Component} from 'react'

import {HiFire} from 'react-icons/hi'

import ThemeContext from '../../context/ThemeContext'

import SideBar from '../SideBar'
import Header from '../Header'

import TrendingVideoCard from '../TrendingVideoCard'

class SavedVideo extends Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {savedList, isLightTheme} = value

          const themeClass = isLightTheme ? 'light-theme' : 'dark-theme'

          return (
            <div className="home-container">
              <div className="header">
                <Header />
              </div>
              <div className="home-content-container">
                <div className="home-content">
                  <SideBar />
                </div>

                <div className={`saved-content ${themeClass}`}>
                  <div className={`trending ${themeClass}-trending`}>
                    <HiFire className={`${themeClass}-menu-icon`} />
                    <h1 className={`no-search-title ${themeClass}-trend`}>
                      Saved Videos
                    </h1>
                  </div>
                  {savedList.length > 0 ? (
                    <ul className="saved-video-list">
                      {savedList.map(eachData => (
                        <TrendingVideoCard
                          details={eachData}
                          key={eachData.id}
                        />
                      ))}
                    </ul>
                  ) : (
                    <div className="no-saved">
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                        alt="no saved videos"
                        className="no-save-img"
                      />
                      <h1 className={`${themeClass}`}>No saved videos found</h1>
                      <p className="no-search-para">
                        You can save your videos while watching them
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default SavedVideo
