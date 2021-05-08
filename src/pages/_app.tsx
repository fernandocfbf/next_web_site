import '../styles/global.scss'
import { WebBoxContextProvider } from '../context/webBoxContext'

function MyApp({ Component, pageProps }) {
  return (
    <WebBoxContextProvider>
      <Component {...pageProps} />
    </WebBoxContextProvider>
  )
}

export default MyApp
