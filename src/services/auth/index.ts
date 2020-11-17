import bcrypt from 'bcryptjs'

import type { IUserAuth } from 'models/user'
import db from 'db'
import TokenService, { Model as TokenModel } from 'services/token'

import AuthError from './error'
import * as Constant from './constant'

class AuthService {
	async signin(user: IUserAuth) {
		const dbUser = await db.query.userByEmail(user)
		if (!dbUser)
			throw new AuthError(Constant.SignInMessage.USERID_NOT_EXISTS)

		const compare = await bcrypt.compare(user.password, dbUser.password)
		if (!compare) throw new AuthError(Constant.SignInMessage.WRONG_PASSWORD)

		return TokenService.makeTokens({ id: dbUser.id })
	}

	async verify(accessToken: TokenModel.ITokens['accessToken']) {
		try {
			return await TokenService.verify(accessToken)
		} catch (err) {
			throw new AuthError(Constant.VerifyMessage.UNAUTHORIZED)
		}
	}

	updateTokens(refreshToken: TokenModel.ITokens['refreshToken']) {
		try {
			return TokenService.updateTokens(refreshToken)
		} catch (err) {
			throw new AuthError(Constant.VerifyMessage.UNAUTHORIZED)
		}
	}
}

export default new AuthService()
export { Constant, AuthError }
