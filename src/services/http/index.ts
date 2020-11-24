import httpStatus from 'http-status-codes'
import useSWR, { mutate } from 'swr'

import { StoreService } from 'services/store'
import { HttpConstant } from './constant'
import HttpError from './error'

import type { APIModel, RouteModel } from 'services/api/model'

const Mutate: {
	[key: string]: string[]
} = {
	'/api/auth/signin': ['/api/me'],
}

const HttpService = new (class HttpService {
	fetcher = async <T extends APIModel.Fetch>(
		path: T['path'],
		body?: T['request']['body']
	): Promise<T['response']> => {
		try {
			const response = await fetch(path, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					accessToken: StoreService.tokens?.accessToken,
					body,
				}),
			})

			if (response.status === httpStatus.UNAUTHORIZED) {
				const token = StoreService.tokens?.refreshToken
				if (token) {
					StoreService.clear()

					const resp = await this.fetcher<RouteModel.UpdateToken>(
						'/api/auth/update',
						token
					)

					if (resp.data) {
						StoreService.tokens = resp.data
						return this.fetcher<T>(path, body)
					}
				}
			}

			return response.json()
		} catch (err) {
			console.error(err)
		}

		const error: APIModel.Response<null> = {
			error: new HttpError(HttpConstant.Message.HTTP_ERROR),
			data: null,
		}

		return error
	}

	get = <T extends APIModel.Fetch>(path: T['path']) =>
		useSWR<T['response']['data'], T['response']['error']>(path)

	post = async <T extends APIModel.Fetch>(
		path: T['path'],
		body: T['request']['body'],
		callback: (data: T['response']['data']) => void
	) => {
		const response = await this.fetcher(path, body)
		if (response.error) {
			return console.error(this.constructor.name, {
				path,
				request: body,
				response: response.error,
			})
		}

		callback(response.data)
		if (Mutate.hasOwnProperty(path)) {
			Mutate[path].forEach((route) => mutate(route))
		}
	}
})()

export { HttpService, HttpError }
