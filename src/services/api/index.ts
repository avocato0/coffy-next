import { StatusCodes } from 'http-status-codes'

import { AuthService } from 'services/auth'
import { ApiConstant } from './constant'
import ApiError from './error'

import type { APIModel } from './model'

const ApiService = new (class ApiService {
	getApiHandler: APIModel.Hanlder = (callback) => {
		return async (req, res) => {
			try {
				const data = await callback(
					req.body.body,
					req.query,
					req.userId
				)

				if (data) {
					return res.send({
						data,
						errors: [],
					})
				} else {
					res.status(ApiError.StatusCodes.INTERNAL_SERVER_ERROR)
					return res.send({
						data: null,
						errors: [
							new ApiError(
								ApiError.StatusCodes.INTERNAL_SERVER_ERROR
							),
						],
					})
				}
			} catch (err) {
				res.status(err.status || StatusCodes.BAD_REQUEST)
				return res.send({
					data: null,
					errors: [err],
				})
			}
		}
	}

	getPrivateApiHandler: APIModel.Hanlder = (callback) => {
		return async (req, res) => {
			const { accessToken } = req.body

			try {
				const payload = await AuthService.verify(accessToken)
				req.userId = payload.id
				return this.getApiHandler(callback)(req, res)
			} catch (err) {
				res.status(StatusCodes.UNAUTHORIZED)
				return res.send({
					data: null,
					errors: [new ApiError(StatusCodes.UNAUTHORIZED, err)],
				})
			}
		}
	}
})()

export { ApiService, ApiConstant, ApiError }
