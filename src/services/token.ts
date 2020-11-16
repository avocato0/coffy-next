import { ITokens } from 'models/user'

class RefreshTokenService {
	private tokens: ITokens['refreshToken'][] = []

	add(token: string) {
		this.tokens.push(token)
	}

	exist(token: string) {
		return ~this.tokens.indexOf(token)
	}

	drop(token: string) {
		this.tokens = this.tokens.filter((el) => token !== el)
	}
}

export default new RefreshTokenService()
