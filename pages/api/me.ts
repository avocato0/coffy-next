import { ApiService, PrivateRouteModel } from 'services/api'
import { userService } from 'services/user'

export default ApiService.getPrivateApiHandler<PrivateRouteModel.Me>(
	(_, __, userId) => {
		return userService.getDBUserById(userId)
	}
)
