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
}
