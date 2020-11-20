import db from 'db'

import { AuthConstant } from 'services/auth'
import { ApiError } from 'services/api'
import { ApiService } from 'services/api'
import { copyWithoutProps } from 'utils/helpers'

export default ApiService.getApiHandler(async ({ query }) => {
	const user = await db.query.userById(query.id as string)

	// if (!user)
	// 	throw new ApiError(
	// 		LoginMessage.USERID_NOT_EXISTS,
	// 		ApiError.status.BAD_REQUEST
	// 	)

	return copyWithoutProps(user, 'password')
})
