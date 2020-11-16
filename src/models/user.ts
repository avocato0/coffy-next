export interface IUserAuth {
	email: string
	password: string
}

export interface IUserDB {
	id: string
	email: string
	name: string
	birth_date?: Date
	company?: number
	readonly password: string
}

export interface ITokens {
	accessToken: string
	refreshToken: string
}

export interface IUserAuthResponse {
	user: IUserDB
	tokens: ITokens
}
