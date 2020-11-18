import { AuthService } from 'services/auth'
import { ApiService, RouteModel } from 'services/api'

export default ApiService.getApiHandler<RouteModel.UpdateToken>(
	async (body) => {
		return AuthService.updateTokens(body)
	}
)
