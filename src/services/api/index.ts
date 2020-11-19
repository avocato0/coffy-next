import httpStatus from 'http-status-codes'

import ApiConstant from './constant'
import ApiError from './error'

import type { APIModel, RouteModel, PrivateRouteModel } from './model'

import { AuthService, AuthConstant } from 'services/auth'
import { StoreService } from 'services/store'

const ApiService = new (class ApiService {
	fetch = async <T extends APIModel.Fetch>(
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

					const resp = await this.fetch<RouteModel.UpdateToken>(
						'/api/auth/update',
						token
					)

					if (resp.data) {
						StoreService.tokens = resp.data
						return this.fetch<T>(path, body)
					}
				}
			}

			return response.json()
		} catch (err) {
			console.error(err)
		}

		const error: APIModel.Response<null> = {
			error: ApiConstant.Message.FETCH_ERROR,
			status: httpStatus.BAD_REQUEST,
			data: null,
		}

		return error
	}

	getApiHandler: APIModel.Hanlder = (callback) => {
		return async (req, res) => {
			try {
				const data = await callback(
					req.body.body,
					req.query,
					req.userId
				)

				return res.send(
					data
						? {
								data,
								status: httpStatus.OK,
								error: null,
						  }
						: {
								data: null,
								status: httpStatus.BAD_REQUEST,
								error: ApiConstant.Message.EMPTY_RESPONSE,
						  }
				)
			} catch (err) {
				res.status(httpStatus.BAD_REQUEST)

				if (err instanceof ApiError) {
					res.status(err.status)
				}

				return res.send({
					data: null,
					error: err.message,
					status: httpStatus.BAD_REQUEST,
				})
			}
		}
	}

	getPrivateApiHandler: APIModel.Hanlder = (callback) => {
		return async (req, res) => {
			const { accessToken } = req.body
			if (!accessToken) {
				res.status(httpStatus.UNAUTHORIZED)
				return res.send({
					error: AuthConstant.Message.Verify.UNAUTHORIZED,
					status: httpStatus.UNAUTHORIZED,
					data: null,
				})
			}

			try {
				const payload = await AuthService.verify(accessToken)
				req.userId = payload.id
				this.getApiHandler(callback)(req, res)
			} catch (err) {
				res.status(httpStatus.UNAUTHORIZED)
				return res.send({
					data: null,
					error: err.message,
					status: httpStatus.UNAUTHORIZED,
				})
			}
		}
	}
})()

export { ApiService, ApiConstant, ApiError }
export type { APIModel, RouteModel, PrivateRouteModel }
