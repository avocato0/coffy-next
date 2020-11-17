import httpStatus from 'http-status-codes'

import { AuthMessage } from 'services/auth/constant'
import { IError } from 'models'

export default class ApiError extends Error implements IError {
	static status = httpStatus

	status = httpStatus.OK
	name = 'ApiError'

	constructor(message: string, status = httpStatus.BAD_REQUEST) {
		super(message)
		this.status = status
	}
}

export const UnauthApiError = () =>
	new ApiError(AuthMessage.UNAUTHORIZED, httpStatus.UNAUTHORIZED)
