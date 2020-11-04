import db from 'db'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const {
		query: { id },
	} = req

	const user = await db.query.user(+id)

	if (user) {
		return res.end(JSON.stringify(user, null, '\t'))
	}

	res.status(404).end('Not found')
}
