import React from 'react'

const ThemeContext = React.createContext({
  isLightTheme: true,
  onChangeTheme: () => {},
  savedList: [],
  onAddSaveVideo: () => {},
})

export default ThemeContext
