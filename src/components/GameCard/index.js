import './index.css'
import {Link} from 'react-router-dom'
import ThemeContext from '../../context/ThemeContext'

const GameCard = props => {
  const {details} = props
  const {thumbnailUrl, title, viewCount, id} = details
  return (
    <ThemeContext.Consumer>
      {value => {
        const {isLightTheme} = value
        const themeClass = isLightTheme ? 'light' : 'dark'
        return (
          <li className="game-card-container">
            <Link className="link" to={`/videos/${id}`}>
              <img
                className="game-thumbnail"
                src={thumbnailUrl}
                alt="video thumbnail"
              />
              <p className={`game-title ${themeClass}-game-title`}>{title}</p>
              <div className="game-details">
                <p className={`game-views ${themeClass}-game-name`}>
                  {viewCount} Watching
                </p>
                <p className={`game-views ${themeClass}-game-name`}>
                  Worldwide
                </p>
              </div>
            </Link>
          </li>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default GameCard
