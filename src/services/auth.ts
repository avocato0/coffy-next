import bcrypt from 'bcryptjs'
import type { ITokens, IUserAuth, IUserDB } from 'models/user'
import jwt from 'jsonwebtoken'
import {
	JWT_ACCESS_SECRET,
	JWT_REFRESH_SECRET,
	LoginMessage,
} from 'constants/auth'
import db from 'db'
import { ApiError, UnauthApiError } from 'errors/api'
import refreshTokenService from './token'
import { copyWithoutProps } from 'utils/helpers'

interface IPayload {
	id: string
}

class AuthService {
	makeToken(data: string | Buffer | object): ITokens {
		const accessToken = jwt.sign(data, JWT_ACCESS_SECRET, {
			expiresIn: process.env.TOKEN_EXPIRED,
		})

		const refreshToken = jwt.sign(data, JWT_REFRESH_SECRET)

		return { accessToken, refreshToken }
	}

	async signin(user: IUserAuth) {
		const dbUser = await db.query.userByEmail(user)
		if (!dbUser) throw new ApiError(LoginMessage.USER_NOT_EXISTS)

		const compare = await bcrypt.compare(user.password, dbUser.password)
		if (!compare) throw new ApiError(LoginMessage.WRONG_PASSWORD)

		const tokens = this.makeToken({ id: dbUser.id })
		refreshTokenService.add(tokens.refreshToken)

		return tokens
	}

	async verify(accessToken: ITokens['accessToken']): Promise<IPayload> {
		const payload = jwt.verify(accessToken, JWT_ACCESS_SECRET) as IPayload

		// const userId = payload.id
		// const user = await db.query.userById(userId)

		return copyWithoutProps(payload, 'iat', 'exp')
	}

	updateTokens(refreshToken: ITokens['refreshToken']): ITokens {
		const exist = refreshTokenService.exist(refreshToken)
		if (!exist) throw UnauthApiError()

		const payload = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as IPayload
		const tokens = this.makeToken({ id: payload.id })

		refreshTokenService.drop(refreshToken)
		refreshTokenService.add(tokens.refreshToken)

		return tokens
	}
}

export default new AuthService()
