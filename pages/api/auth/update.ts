import { AuthService } from 'services/auth'
import { ApiService } from 'services/api'
import type { RouteModel } from 'services/api/model'

export default ApiService.getApiHandler<RouteModel.UpdateToken>(
	async (body) => {
		return AuthService.updateTokens(body)
	}
)
