import { getReasonPhrase, StatusCodes } from 'http-status-codes'

class ApiError extends Error {
	static StatusCodes = StatusCodes
	name = 'ApiError'

	public code: string
	public message: string

	constructor(
		public status: StatusCodes = StatusCodes.BAD_REQUEST,
		public inner?: Error
	) {
		super()
		this.code = StatusCodes[status]
		this.message = getReasonPhrase(status)
	}
}

export default ApiError
