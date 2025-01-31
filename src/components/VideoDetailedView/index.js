import './index.css'
import {formatDistanceToNowStrict} from 'date-fns'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsDot} from 'react-icons/bs'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {MdPlaylistAdd} from 'react-icons/md'
import ReactPlayer from 'react-player'
import Loader from 'react-loader-spinner'

import ThemeContext from '../../context/ThemeContext'

import SideBar from '../SideBar'
import Header from '../Header'

const statusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class VideoDetailedView extends Component {
  state = {
    data: [],
    status: statusConstants.initial,
    isLike: false,
    isDislike: false,
    isSave: false,
  }

  onLike = () => {
    this.setState(prevState => ({
      isLike: !prevState.isLike,
      isDislike: prevState.isLike ? prevState.isDislike : false,
    }))
  }

  onDislike = () => {
    this.setState(prevState => ({
      isDislike: !prevState.isDislike,
      isLike: prevState.isDislike ? prevState.isLike : false,
    }))
  }

  getData = async () => {
    this.setState({status: statusConstants.loading})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/videos/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      const updatedData = {
        channel: {
          name: data.video_details.channel.name,
          profileImageUrl: data.video_details.channel.profile_image_url,
          subscriberCount: data.video_details.channel.subscriber_count,
        },
        description: data.video_details.description,
        id: data.video_details.id,
        publishedAt: data.video_details.published_at,
        thumbnailUrl: data.video_details.thumbnail_url,
        title: data.video_details.title,
        viewCount: data.video_details.view_count,
        videoUrl: data.video_details.video_url,
      }
      this.setState({data: updatedData, status: statusConstants.success})
    } else {
      this.setState({status: statusConstants.failure})
    }
  }

  componentDidMount = () => {
    this.getData()
  }

  render() {
    const {data, status, isLike, isDislike} = this.state
    const {
      videoUrl,
      title,
      viewCount,
      publishedAt,
      channel,
      description,
      id,
    } = data

    let renderData

    switch (status) {
      case statusConstants.success:
        renderData = (
          <ThemeContext.Consumer>
            {value => {
              const {isLightTheme, onAddSaveVideo, savedList} = value
              const themeClass = isLightTheme ? 'light' : 'dark'
              return (
                <div className="detail-video-container">
                  <div className="video-wrapper">
                    <ReactPlayer
                      url={videoUrl}
                      width="100%"
                      height="100%"
                      controls
                    />
                  </div>
                  <p className={`detail-title ${themeClass}-detail-title`}>
                    {title}
                  </p>
                  <div className="video-details">
                    <div className="about-video">
                      <p className={`detail-views ${themeClass}-detail-name`}>
                        {viewCount} views
                      </p>
                      <BsDot className={`${themeClass}-detail-name`} />
                      <p className={`detail-views ${themeClass}-detail-name`}>
                        {`${formatDistanceToNowStrict(
                          new Date(publishedAt),
                        )} ago`}
                      </p>
                    </div>
                    <div className="about-video">
                      <button
                        type="button"
                        onClick={this.onLike}
                        className={`detail-views ${themeClass}-detail-name`}
                        style={isLike ? {color: '#2563eb'} : {color: '#64748b'}}
                      >
                        <AiOutlineLike /> Like
                      </button>

                      <button
                        type="button"
                        onClick={this.onDislike}
                        className={`detail-views ${themeClass}-detail-name`}
                        style={
                          isDislike ? {color: '#2563eb'} : {color: '#64748b'}
                        }
                      >
                        <AiOutlineDislike style={{marginLeft: '15px'}} />{' '}
                        Dislike
                      </button>

                      {savedList.some(each => id === each.id) ? (
                        <button
                          type="button"
                          className={`detail-views ${themeClass}-detail-name`}
                          style={{color: '#2563eb'}}
                          onClick={() => {
                            onAddSaveVideo(data)

                            this.setState(prevState => ({
                              isSave: !prevState.isSave,
                            }))
                          }}
                        >
                          <MdPlaylistAdd style={{marginLeft: '15px'}} /> Saved
                        </button>
                      ) : (
                        <button
                          type="button"
                          className={`detail-views ${themeClass}-detail-name`}
                          onClick={() => {
                            onAddSaveVideo(data)

                            this.setState(prevState => ({
                              isSave: !prevState.isSave,
                            }))
                          }}
                        >
                          <MdPlaylistAdd style={{marginLeft: '15px'}} /> Save
                        </button>
                      )}
                    </div>
                  </div>
                  <hr className={`${themeClass}-detail-line`} />
                  <div>
                    <div className="profile-details">
                      <img
                        className="detail-profile"
                        src={channel.profileImageUrl}
                        alt="channel logo"
                      />
                      <div>
                        <p
                          className={`detail-title ${themeClass}-detail-title`}
                        >
                          {channel.name}
                        </p>
                        <p className={`detail-views ${themeClass}-detail-name`}>
                          {channel.subscriberCount} subscribers
                        </p>
                      </div>
                    </div>
                    <p className={`detail-views ${themeClass}-detail-name`}>
                      {description}
                    </p>
                  </div>
                </div>
              )
            }}
          </ThemeContext.Consumer>
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

                <div className={`main-content ${themeClass}`}>{renderData}</div>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default VideoDetailedView
