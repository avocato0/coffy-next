import bcrypt from 'bcryptjs'

import type { UserModel } from 'services/user'
import db from 'db'
import { TokenService, TokenModel } from 'services/token'

import AuthError from './error'
import * as Constant from './constant'

const AuthService = new (class AuthService {
	async signin(user: UserModel.Auth) {
		const dbUser = await db.query.userByEmail(user)
		if (!dbUser)
			throw new AuthError(Constant.SignInMessage.USERID_NOT_EXISTS)

		const compare = await bcrypt.compare(user.password, dbUser.password)
		if (!compare) throw new AuthError(Constant.SignInMessage.WRONG_PASSWORD)

		return TokenService.makeTokens({ id: dbUser.id })
	}

	async verify(accessToken: TokenModel.Tokens['accessToken']) {
		try {
			return await TokenService.verify(accessToken)
		} catch (err) {
			throw new AuthError(Constant.VerifyMessage.UNAUTHORIZED)
		}
	}

	updateTokens(refreshToken: TokenModel.Tokens['refreshToken']) {
		try {
			return TokenService.updateTokens(refreshToken)
		} catch (err) {
			throw new AuthError(Constant.VerifyMessage.UNAUTHORIZED)
		}
	}
})()

export { Constant, AuthError, AuthService }
