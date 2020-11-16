import { AuthMessage } from 'constants/auth'
import httpStatus from 'http-status-codes'

export class ApiError extends Error {
	static status = httpStatus

	status = httpStatus.OK

	constructor(message: string, status = httpStatus.BAD_REQUEST) {
		super(message)
		this.status = status
	}
}

export const UnauthApiError = () =>
	new ApiError(AuthMessage.UNAUTHORIZED, httpStatus.UNAUTHORIZED)
