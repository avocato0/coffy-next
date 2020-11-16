import { LoginMessage } from 'constants/auth'
import db from 'db'
import { ApiError } from 'errors/api'
import { getHandler } from 'utils/api'
import { copyWithoutProps } from 'utils/helpers'

export default getHandler(async ({ query }) => {
	const user = await db.query.userById(query.id as string)

	if (!user)
		throw new ApiError(
			LoginMessage.USERID_NOT_EXISTS,
			ApiError.status.BAD_REQUEST
		)

	return copyWithoutProps(user, 'password')
})
