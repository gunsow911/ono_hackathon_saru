import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'maplibre-gl/dist/maplibre-gl.css'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
