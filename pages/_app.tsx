import Head from 'next/head'
import Navbar from '../components/Navbar'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import AuthService from 'services/auth'

AuthService.add('test@global.meow', 'crash137')

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>{Component.name} &#8210; Coffy</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Navbar />
			<main>
				<Component {...pageProps} />
			</main>
		</>
	)
}

export default MyApp
