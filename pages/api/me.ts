import type { PrivateRouteModel } from 'services/api/model'
import { ApiService } from 'services/api'
import { UserService } from 'services/user'

export default ApiService.getPrivateApiHandler<PrivateRouteModel.Me>(
	(_, __, userId) => {
		return UserService.getDBUserById(userId)
	}
)
