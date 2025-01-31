import {Switch, Route} from 'react-router-dom'
import {Component} from 'react'

import ThemeContext from './context/ThemeContext'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'
import Login from './components/Login'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import VideoDetailedView from './components/VideoDetailedView'
import SavedVideo from './components/SavedVideo'
import NotFound from './components/NotFound'

class App extends Component {
  state = {isLightTheme: true, savedList: []}

  onChangeTheme = () => {
    this.setState(prevState => ({
      isLightTheme: !prevState.isLightTheme,
    }))
  }

  onAddSaveVideo = data => {
    this.setState(prevState => {
      const isAlreadySaved = prevState.savedList.some(
        video => video.id === data.id,
      )

      if (isAlreadySaved) {
        return {
          savedList: prevState.savedList.filter(video => video.id !== data.id),
        }
      }

      return {
        savedList: [...prevState.savedList, data],
      }
    })
  }

  render() {
    const {isLightTheme, savedList} = this.state
    return (
      <ThemeContext.Provider
        value={{
          isLightTheme,
          onChangeTheme: this.onChangeTheme,
          savedList,
          onAddSaveVideo: this.onAddSaveVideo,
          onRemoveSaveVideo: this.onRemoveSaveVideo,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoDetailedView}
          />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideo} />
          <Route component={NotFound} />
        </Switch>
      </ThemeContext.Provider>
    )
  }
}

export default App
