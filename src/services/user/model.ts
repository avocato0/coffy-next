export namespace UserModel {
	export interface Auth {
		email: string
		password: string
	}

	export interface DB {
		id: string
		email: string
		name: string
		birth_date?: Date
		company?: number
		readonly password: string
	}
}
