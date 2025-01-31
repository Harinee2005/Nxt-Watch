import './index.css'
import {formatDistanceToNowStrict} from 'date-fns'
import {Link} from 'react-router-dom'
import {BsDot} from 'react-icons/bs'
import ThemeContext from '../../context/ThemeContext'

const TrendingVideoCard = props => {
  const {details} = props
  const {channel, publishedAt, thumbnailUrl, title, viewCount, id} = details
  const {name, profileImageUrl} = channel
  return (
    <ThemeContext.Consumer>
      {value => {
        const {isLightTheme} = value
        const themeClass = isLightTheme ? 'light' : 'dark'
        return (
          <Link className="link" to={`videos/${id}`}>
            <li className="trend-video-card-container">
              <img
                className="trend-thumbnail"
                src={thumbnailUrl}
                alt="video thumbnail"
              />
              <div className="trend-details-container">
                <img
                  className="trend-profile"
                  src={profileImageUrl}
                  alt="profile"
                />
                <div>
                  <p className={`trend-title ${themeClass}-title-trend`}>
                    {title}
                  </p>
                  <div className="about-video">
                    <p className={`trend-views ${themeClass}-name-trend`}>
                      {name}
                    </p>
                    <BsDot className={`${themeClass}-name-trend`} />
                    <p className={`views ${themeClass}-name-trend`}>
                      {viewCount} views
                    </p>
                    <BsDot className={`${themeClass}-name-trend`} />
                    <p className={`trend-views ${themeClass}-name-trend`}>
                      {`${formatDistanceToNowStrict(
                        new Date(publishedAt),
                      )} ago`}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          </Link>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default TrendingVideoCard
