import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'
import {SiYoutubegaming} from 'react-icons/si'

import ThemeContext from '../../context/ThemeContext'

import SideBar from '../SideBar'
import Header from '../Header'
import GameCard from '../GameCard'

const statusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Gaming extends Component {
  state = {
    data: [],
    status: statusConstants.initial,
  }

  getData = async () => {
    this.setState({status: statusConstants.loading})

    const url = 'https://apis.ccbp.in/videos/gaming'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const updatedData = data.videos.map(eachData => ({
        id: eachData.id,
        thumbnailUrl: eachData.thumbnail_url,
        title: eachData.title,
        viewCount: eachData.view_count,
      }))
      this.setState({data: updatedData, status: statusConstants.success})
    } else {
      this.setState({status: statusConstants.failure})
    }
  }

  componentDidMount = () => {
    this.getData()
  }

  render() {
    const {data, status} = this.state

    let renderData

    switch (status) {
      case statusConstants.success:
        renderData = (
          <ul className="video-container">
            {data.length > 0 ? (
              data.map(eachData => (
                <GameCard details={eachData} key={eachData.id} />
              ))
            ) : (
              <ThemeContext.Consumer>
                {value => {
                  const {isLightTheme} = value
                  const noResultsThemeClass = isLightTheme ? 'light' : 'dark'

                  return <h1 className={`${noResultsThemeClass}`}>Hai</h1>
                }}
              </ThemeContext.Consumer>
            )}
          </ul>
        )
        break
      case statusConstants.loading:
        renderData = (
          <div
            className="loader-container loading-container"
            data-testid="loader"
          >
            <Loader type="ThreeDots" color="#424242" height="50" width="50" />
          </div>
        )
        break
      case statusConstants.failure:
        renderData = (
          <ThemeContext.Consumer>
            {value => {
              const {isLightTheme} = value
              const noResultsThemeClass = isLightTheme ? 'light' : 'dark'
              const imageUrl = isLightTheme
                ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
                : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'

              return (
                <div className={`no-search-found ${noResultsThemeClass}`}>
                  <img src={imageUrl} alt="fail" className="no-search-img" />
                  <h1
                    className={`no-search-title ${noResultsThemeClass}-no-search-title`}
                  >
                    Oops! Something Went Wrong
                  </h1>
                  <p className="no-search-para">
                    We are having some trouble to Complete your request.
                  </p>
                  <p className="no-search-para">Please try again.</p>
                  <button
                    className="retry-btn"
                    type="button"
                    onClick={this.getData}
                  >
                    Retry
                  </button>
                </div>
              )
            }}
          </ThemeContext.Consumer>
        )
        break
      default:
        renderData = null
        break
    }

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isLightTheme} = value
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

                <div className={`main-content ${themeClass}`}>
                  <div className={`trending ${themeClass}-trending`}>
                    <SiYoutubegaming className={`${themeClass}-menu-icon`} />
                    <h1 className={`no-search-title ${themeClass}-trend`}>
                      Gaming
                    </h1>
                  </div>
                  {renderData}
                </div>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Gaming
