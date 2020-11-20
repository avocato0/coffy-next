import type { UserModel } from 'services/user/model'
import { Pool } from 'pg'

const pool = new Pool()

pool.on('error', (err: Error) => {
	console.error('Unexpected error on idle client', err)
	process.exit(-1)
})
;(async () => {
	const client = await pool.connect()
	try {
		// console.table((await client.query('SELECT * FROM users')).rows)
	} finally {
		client.release()
	}
})().catch(console.error)

export default {
	query: {
		async userById(id: UserModel.DB['id']): Promise<UserModel.DB> {
			const result = await pool.query(
				'SELECT * FROM users WHERE id = $1',
				[id]
			)
			return result.rows[0]
		},
		async userByEmail(user: UserModel.Auth): Promise<UserModel.DB> {
			const result = await pool.query(
				'SELECT * FROM users WHERE email = $1',
				[user.email]
			)
			return result.rows[0]
		},
	},
}
