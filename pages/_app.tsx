import type { AppProps } from 'next/app'
import Head from 'next/head'
import { SWRConfig } from 'swr'

import Navbar from 'components/Navbar'
import { HttpService } from 'services/http'

import 'styles/globals.scss'

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>{Component.name} &#8210; Coffy</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<SWRConfig
				value={{
					fetcher: async (path, config) => {
						const { data, error } = await HttpService.fetcher(
							path,
							config
						)
						if (data) {
							return data
						}

						throw error
					},
				}}>
				<Navbar />
				<Component {...pageProps} />
			</SWRConfig>
		</>
	)
}
