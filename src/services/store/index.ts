import type { TokenModel } from 'services/token'

type ITokens = TokenModel.Tokens | null

const StoreService = new (class StoreService {
	private _tokens: ITokens = null

	get tokens() {
		return this._tokens
	}

	set tokens(tokens: ITokens) {
		this._tokens = tokens
	}

	clear = () => {
		this._tokens = null
	}
})()

export { StoreService }
