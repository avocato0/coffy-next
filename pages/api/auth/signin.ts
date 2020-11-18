import { AuthService } from 'services/auth'
import { ApiService, RouteModel, ApiError } from 'services/api'

export default ApiService.getApiHandler<RouteModel.Auth>(async (body) => {
	try {
		return await AuthService.signin(body)
	} catch (err) {
		throw new ApiError(err.message, ApiError.status.BAD_REQUEST)
	}
})
