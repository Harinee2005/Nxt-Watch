import './index.css'
import {formatDistanceToNowStrict} from 'date-fns'
import {Link} from 'react-router-dom'
import {BsDot} from 'react-icons/bs'
import ThemeContext from '../../context/ThemeContext'

const VideoCard = props => {
  const {details} = props
  const {channel, publishedAt, thumbnailUrl, title, viewCount, id} = details
  const {name, profileImageUrl} = channel
  return (
    <ThemeContext.Consumer>
      {value => {
        const {isLightTheme} = value
        const themeClass = isLightTheme ? 'light' : 'dark'
        return (
          <li className="video-card-container">
            <Link to={`videos/${id}`} className="link">
              <img
                className="thumbnail"
                src={thumbnailUrl}
                alt="video thumbnail"
              />
              <div className="details-container">
                <img
                  className="profile"
                  src={profileImageUrl}
                  alt="channel logo"
                />
                <div>
                  <p className={`title ${themeClass}-title`}>{title}</p>
                  <p className={`name ${themeClass}-name`}>{name}</p>
                  <div className="about-video">
                    <p className={`views ${themeClass}-name`}>
                      {viewCount} views
                    </p>
                    <BsDot className={`${themeClass}-name`} />
                    <p className={`views ${themeClass}-name`}>
                      {`${formatDistanceToNowStrict(
                        new Date(publishedAt),
                      )} ago`}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default VideoCard
