import db from 'db'
import type UserModel from './model'
import UserError from './error'
import UserConstant from './constant'
import { copyWithoutProps } from 'utils/helpers'

class UserService {
	async getDBUserById(id: UserModel.DB['id']) {
		const user = await db.query.userById(id)
		if (!user) throw new UserError(UserConstant.Message.NOT_FOUND)

		return copyWithoutProps(user, 'password')
	}
}

const userService = new UserService()
export type { UserModel }
export { UserError, UserConstant, userService }
