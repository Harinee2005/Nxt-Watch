import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'

import {IoCloseSharp} from 'react-icons/io5'
import {IoIosSearch} from 'react-icons/io'
import Loader from 'react-loader-spinner'

import ThemeContext from '../../context/ThemeContext'

import SideBar from '../SideBar'
import Header from '../Header'
import VideoCard from '../VideoCard'

const statusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    adShow: true,
    searching: '',
    searched: '',
    data: [],
    status: statusConstants.initial,
  }

  onCloseAd = () => {
    this.setState({adShow: false})
  }

  onSearching = e => {
    this.setState({searching: e.target.value})
  }

  onSearch = () => {
    const {searching} = this.state
    this.setState({searched: searching}, this.getData)
  }

  getData = async () => {
    this.setState({status: statusConstants.loading})
    const {searched} = this.state
    const url = `https://apis.ccbp.in/videos/all?search=${searched}`
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
        channel: {
          name: eachData.channel.name,
          profileImageUrl: eachData.channel.profile_image_url,
        },
        id: eachData.id,
        publishedAt: eachData.published_at,
        thumbnailUrl: eachData.thumbnail_url,
        title: eachData.title,
        viewCount: eachData.view_count,
      }))
      this.setState({data: updatedData, status: statusConstants.success})
      console.log(updatedData)
    } else {
      this.setState({
        status: statusConstants.failure,
      })
    }
  }

  componentDidMount = () => {
    this.getData()
  }

  render() {
    const {adShow, searching, data, status} = this.state

    let renderData

    switch (status) {
      case statusConstants.success:
        renderData = (
          <ul className="video-container">
            {data.length > 0 ? (
              data.map(eachData => (
                <VideoCard details={eachData} key={eachData.id} />
              ))
            ) : (
              <ThemeContext.Consumer>
                {value => {
                  const {isLightTheme} = value
                  const noResultsThemeClass = isLightTheme ? 'light' : 'dark'

                  return (
                    <div className={`no-search-found ${noResultsThemeClass}`}>
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
                        alt="no videos"
                        className="no-search-img"
                      />
                      <h1
                        className={`no-search-title ${noResultsThemeClass}-no-search-title`}
                      >
                        No Search results found
                      </h1>
                      <p className="no-search-para">
                        Try different key words or remove search filter
                      </p>
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
                  <img
                    src={imageUrl}
                    alt="failure view"
                    className="failure-view"
                  />
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
          const searchBarStyle = adShow ? '' : 'search-with-margin'

          return (
            <div className={`home-container ${themeClass}`}>
              <div className={`header ${themeClass}-bg`}>
                <Header />
              </div>
              <div className="home-content-container" data-testid="home">
                <div className="home-content">
                  <SideBar />
                </div>
                <div className={`main-content ${themeClass}`}>
                  {adShow && (
                    <div className="banner-ad-img-close">
                      <div data-testid="banner" className="ad-banner">
                        <div className="banner-content">
                          <img
                            className="banner-logo"
                            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                            alt="nxt watch logo"
                          />
                          <p className="banner-heading">
                            Buy Nxt Watch Premium prepaid plans with UPI
                          </p>
                          <button className="banner-btn" type="button">
                            GET IT NOW
                          </button>
                        </div>
                        <button
                          className="close-btn-banner"
                          type="button"
                          onClick={this.onCloseAd}
                          data-testid="close"
                        >
                          <IoCloseSharp />
                        </button>
                      </div>
                    </div>
                  )}

                  <div className={`search-bar ${searchBarStyle}`}>
                    <input
                      type="search"
                      placeholder="Search"
                      className={`${themeClass}-search`}
                      onChange={this.onSearching}
                      value={searching}
                    />
                    <button
                      type="button"
                      className={`${themeClass}-search-btn`}
                      onClick={this.onSearch}
                      data-testid="searchButton"
                    >
                      <IoIosSearch />
                    </button>
                  </div>

                  {/* Rendered data */}
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

export default Home
