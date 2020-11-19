import { ApiService, PrivateRouteModel } from 'services/api'
import { UserService } from 'services/user'

export default ApiService.getPrivateApiHandler<PrivateRouteModel.Me>(
	(_, __, userId) => {
		return UserService.getDBUserById(userId)
	}
)
