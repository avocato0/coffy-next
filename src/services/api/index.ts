import { StatusCodes } from 'http-status-codes'

import { AuthService } from 'services/auth'
import { ApiConstant } from './constant'
import ApiError from './error'

import type { APIModel } from './model'

const ApiService = new (class ApiService {
	getApiHandler: APIModel.Hanlder = (callback) => {
		return async (req, res) => {
			try {
				const data = await callback(req.body, req.query, req.userId)

				if (data) {
					return res.send({
						data,
						error: null,
					})
				} else {
					res.status(ApiError.StatusCodes.INTERNAL_SERVER_ERROR)
					return res.send({
						data: null,
						error: new ApiError(
							ApiError.StatusCodes.INTERNAL_SERVER_ERROR
						),
					})
				}
			} catch (err) {
				res.status(err.status || StatusCodes.BAD_REQUEST)
				return res.send({
					data: null,
					error: err,
				})
			}
		}
	}

	getPrivateApiHandler: APIModel.Hanlder = (callback) => {
		return async (req, res) => {
			try {
				const { authorization = '' } = req.headers
				const [type, accessToken] = (authorization as string).split(' ')

				if (type !== 'Bearer' || !accessToken) {
					res.status(StatusCodes.UNAUTHORIZED)
					return res.send({
						data: null,
						error: new ApiError(StatusCodes.UNAUTHORIZED),
					})
				}

				const payload = await AuthService.verify(accessToken)
				req.userId = payload.id
				return this.getApiHandler(callback)(req, res)
			} catch (err) {
				res.status(StatusCodes.UNAUTHORIZED)
				return res.send({
					data: null,
					error: new ApiError(StatusCodes.UNAUTHORIZED, err),
				})
			}
		}
	}
})()

export { ApiService, ApiConstant, ApiError }
