import jwt, { TokenExpiredError } from 'jsonwebtoken'

import * as Constant from './constant'
import TokenError from './error'
import * as Model from './model'

import { copyWithoutProps } from 'utils/helpers'

class TokenService {
	private tokens: Model.ITokens['refreshToken'][] = []

	refreshAdd(token: string) {
		this.tokens.push(token)
	}

	refreshExist(token: string) {
		return ~this.tokens.indexOf(token)
	}

	refreshDrop(token: string) {
		this.tokens = this.tokens.filter((el) => token !== el)
	}

	makeTokens(data: Model.IPayload): Model.ITokens {
		const accessToken = jwt.sign(data, Constant.JWT_ACCESS_SECRET, {
			expiresIn: process.env.TOKEN_EXPIRED,
		})

		const refreshToken = jwt.sign(data, Constant.JWT_REFRESH_SECRET)
		this.refreshAdd(refreshToken)

		return { accessToken, refreshToken }
	}

	updateTokens(refreshToken: Model.ITokens['refreshToken']): Model.ITokens {
		const exist = this.refreshExist(refreshToken)
		if (!exist) throw new TokenError(Constant.TokenMessage.NOT_EXIST)

		const payload = jwt.verify(
			refreshToken,
			Constant.JWT_REFRESH_SECRET
		) as Model.IPayload
		const tokens = this.makeTokens({ id: payload.id })

		this.refreshDrop(refreshToken)
		this.refreshAdd(tokens.refreshToken)

		return tokens
	}

	async verify(
		accessToken: Model.ITokens['accessToken']
	): Promise<Model.IPayload> {
		try {
			const payload = jwt.verify(
				accessToken,
				Constant.JWT_ACCESS_SECRET
			) as Model.IPayload
			return copyWithoutProps(payload, 'iat', 'exp')
		} catch (err) {
			if (err instanceof TokenExpiredError)
				throw new TokenError(Constant.TokenMessage.EXPIRED)

			throw new TokenError(Constant.TokenMessage.NOT_VALID)
		}
	}
}

export default new TokenService()
export { Model, Constant, TokenError, TokenExpiredError }
