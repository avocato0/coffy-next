import bcrypt from 'bcryptjs'

import db from 'db'
import { TokenService } from 'services/token'
import AuthError from './error'
import AuthConstant from './constant'

import type { UserModel } from 'services/user/model'
import type { TokenModel } from 'services/token/model'

const unAuthError = () =>
	new AuthError(AuthConstant.Message.Verify.UNAUTHORIZED)

const AuthService = new (class AuthService {
	async signin(user: UserModel.Auth) {
		const dbUser = await db.query.userByEmail(user)
		if (!dbUser) {
			throw new AuthError(AuthConstant.Message.SignIn.USERID_NOT_EXISTS)
		}

		const compare = await bcrypt.compare(user.password, dbUser.password)
		if (!compare) {
			throw new AuthError(AuthConstant.Message.SignIn.WRONG_PASSWORD)
		}

		return TokenService.makeTokens({ id: dbUser.id })
	}

	async verify(accessToken?: TokenModel.Tokens['accessToken']) {
		if (!accessToken) {
			throw unAuthError()
		}

		try {
			return await TokenService.verify(accessToken)
		} catch (err) {
			const error = unAuthError()
			error.inner = err
			throw error
		}
	}

	updateTokens(refreshToken: TokenModel.Tokens['refreshToken']) {
		try {
			return TokenService.updateTokens(refreshToken)
		} catch (err) {
			const error = unAuthError()
			error.inner = err
			throw error
		}
	}
})()

export { AuthConstant, AuthError, AuthService }
