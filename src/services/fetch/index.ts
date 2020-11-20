import httpStatus from 'http-status-codes'

import { StoreService } from 'services/store'
import { FetchConstant } from './constant'
import FetchError from './error'

import type { APIModel, RouteModel } from 'services/api/model'

export const fetcher = async <T extends APIModel.Fetch>(
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

				const resp = await fetcher<RouteModel.UpdateToken>(
					'/api/auth/update',
					token
				)

				if (resp.data) {
					StoreService.tokens = resp.data
					return fetcher<T>(path, body)
				}
			}
		}

		return response.json()
	} catch (err) {
		console.error(err)
	}

	const error: APIModel.Response<null> = {
		errors: [new FetchError(FetchConstant.Message.FETCH_ERROR)],
		data: null,
	}

	return error
}
