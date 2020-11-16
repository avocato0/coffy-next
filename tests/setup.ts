import path from 'path'
import dotenv from 'dotenv'

dotenv.config({
	path: path.resolve(process.cwd(), '.env.local'),
})

global.fetch = async (path: RequestInfo, req?: RequestInit | undefined) => {
	const response = {
		body: null,
		json() {
			return Promise.resolve(this.body)
		},
		status: NaN,
	}

	const { default: handler } = require(`../pages${path}`)
	return new Promise((resolve) => {
		handler(
			{
				body: req?.body ? JSON.parse(req.body as string) : {},
			},
			{
				status(status: number) {
					response.status = status
				},
				send(data: any) {
					response.body = data
					resolve(response as Response)
				},
			}
		)
	})
}
