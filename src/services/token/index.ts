import jwt, { TokenExpiredError } from 'jsonwebtoken'

import TokenConstant from './constant'
import TokenError from './error'
import TokenModel from './model'

import { copyWithoutProps } from 'utils/helpers'

const TokenService = new (class TokenService {
	private tokens: TokenModel.Tokens['refreshToken'][] = []

	refreshAdd(token: string) {
		this.tokens.push(token)
	}

	refreshExist(token: string) {
		return ~this.tokens.indexOf(token)
	}

	refreshDrop(token: string) {
		this.tokens = this.tokens.filter((el) => token !== el)
	}

	makeTokens(data: TokenModel.Payload): TokenModel.Tokens {
		const accessToken = jwt.sign(data, TokenConstant.JWT_ACCESS_SECRET, {
			expiresIn: process.env.TOKEN_EXPIRED,
		})

		const refreshToken = jwt.sign(data, TokenConstant.JWT_REFRESH_SECRET)
		this.refreshAdd(refreshToken)

		return { accessToken, refreshToken }
	}

	updateTokens(
		refreshToken: TokenModel.Tokens['refreshToken']
	): TokenModel.Tokens {
		const exist = this.refreshExist(refreshToken)
		if (!exist) throw new TokenError(TokenConstant.Message.NOT_EXIST)

		const payload = jwt.verify(
			refreshToken,
			TokenConstant.JWT_REFRESH_SECRET
		) as TokenModel.Payload
		const tokens = this.makeTokens({ id: payload.id })

		this.refreshDrop(refreshToken)
		this.refreshAdd(tokens.refreshToken)

		return tokens
	}

	async verify(
		accessToken: TokenModel.Tokens['accessToken']
	): Promise<TokenModel.Payload> {
		try {
			const payload = jwt.verify(
				accessToken,
				TokenConstant.JWT_ACCESS_SECRET
			) as TokenModel.Payload
			return copyWithoutProps(payload, 'iat', 'exp')
		} catch (err) {
			if (err instanceof TokenExpiredError)
				throw new TokenError(TokenConstant.Message.EXPIRED)

			throw new TokenError(TokenConstant.Message.NOT_VALID)
		}
	}
})()

export { TokenConstant, TokenError, TokenService }
export type { TokenModel }
