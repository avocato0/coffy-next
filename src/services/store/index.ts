import StoreConstant from './constant'

import type { TokenModel } from 'services/token/model'
type ITokens = TokenModel.Tokens | null

const LocalStorageStore = new (class LocalStorageStore {
	set(tokens: ITokens) {
		if (globalThis.localStorage) {
			localStorage.setItem(
				StoreConstant.LOCALSTORAGE_KEY,
				JSON.stringify(tokens)
			)
		}
	}

	get(): ITokens {
		if (globalThis.localStorage) {
			const data = localStorage.getItem(StoreConstant.LOCALSTORAGE_KEY)

			if (data) {
				return JSON.parse(data)
			}
		}

		return null
	}

	clear() {
		if (globalThis.localStorage) {
			localStorage.removeItem(StoreConstant.LOCALSTORAGE_KEY)
		}
	}
})()

const StoreService = new (class StoreService {
	private _tokens = LocalStorageStore.get()

	get tokens() {
		return this._tokens
	}

	set tokens(tokens: ITokens) {
		this._tokens = tokens
		LocalStorageStore.set(tokens)
	}

	clear = () => {
		this._tokens = null
		LocalStorageStore.clear()
	}
})()

export { StoreService, StoreConstant }
