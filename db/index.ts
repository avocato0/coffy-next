const { Pool } = require('pg')

const pool = new Pool()

pool.on('error', (err: Error) => {
	console.error('Unexpected error on idle client', err)
	process.exit(-1)
})
;(async () => {
	const client = await pool.connect()
	try {
		const res = await client.query('SELECT * FROM users')
		console.table(res.rows)
	} finally {
		client.release()
	}
})().catch(console.error)

export default {
	query: {
		async user(id: number) {
			const result = await pool.query(
				'SELECT * FROM users WHERE id = $1',
				[id]
			)
			return result.rows[0]
		},
	},
}
