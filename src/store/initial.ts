import { ITokens, IUserDB } from 'models/user'

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
