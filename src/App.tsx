import { Stories } from './components/Stories'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  :root {
    --tg-viewport-height: 100vh;
    --tg-viewport-stable-height: 100vh;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html, body {
    height: var(--tg-viewport-stable-height);
    overflow: hidden;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background: #000;
    color: #fff;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
  }
`

function App() {
  return (
    <>
      <GlobalStyle />
      <Stories />
    </>
  )
}

export default App
