import { ApiError } from 'errors/api'
import { IFetch, IResponse } from 'models/api'
import { NextApiRequest, NextApiResponse } from 'next'

export const fetcher = async <T extends IFetch>(
	path: T['path'],
	body: T['request']
): Promise<T['response']> => {
	try {
		const response = await fetch(path, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		})

		if (response.ok) {
			return response.json()
		}
	} catch (err) {
		console.error(err)
	}

	const error: IResponse<null> = {
		data: null,
		error: 'Error from fetch',
	}

	return error
}

export const getHandler = <T extends IFetch>(
	callback: (body: T['request']) => Promise<T['response']['data']>
) => {
	return async (req: NextApiRequest, res: NextApiResponse) => {
		try {
			const respBody = await callback(req.body)
			res.send(respBody)
		} catch (err) {
			res.status(ApiError.status.BAD_REQUEST)

			if (err instanceof ApiError) {
				res.status(err.status)
			}

			res.send({
				data: null,
				error: err.message,
			})
		}
	}
}
