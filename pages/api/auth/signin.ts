import { IUserAuth } from 'models/user'
import { NextApiRequest, NextApiResponse } from 'next'
import AuthService from 'services/auth'
import httpCodes from 'http-status-codes'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const user: IUserAuth = req.body
	try {
		const dbUser = await AuthService.signin(user)
		res.json({
			data: dbUser,
			error: null,
		})
	} catch (err) {
		res.status(httpCodes.NOT_FOUND)
		res.json({
			data: null,
			error: err.message,
		})
	}
}
