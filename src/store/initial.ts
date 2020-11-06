import { IUserDB } from 'models/user'
import { ITokens } from 'services/auth'

const createStore = () => ({
	// User

	user: {
		name: 'Unknow',
	} as IUserDB,
	setUser(user: IUserDB) {
		this.user = user
	},

	// Tokens
	tokens: {} as ITokens,
	setTokens(tokens: ITokens) {
		this.tokens = tokens
	},
})

export default createStore
