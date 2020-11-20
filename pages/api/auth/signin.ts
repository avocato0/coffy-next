import { AuthService } from 'services/auth'
import { ApiService, ApiError } from 'services/api'
import type { RouteModel } from 'services/api/model'

export default ApiService.getApiHandler<RouteModel.Auth>(async (body) => {
	try {
		return await AuthService.signin(body)
	} catch (err) {
		throw new ApiError(ApiError.StatusCodes.BAD_REQUEST, err)
	}
})
