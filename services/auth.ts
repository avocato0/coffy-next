import bcrypt from 'bcryptjs'
import { nanoid } from 'nanoid'
import type { IUser } from 'models/user'
import jwt from 'jsonwebtoken'
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from 'constants/auth'

class AuthService {
	private store: {
		[key: string]: {
			username: string
			password: string
		}
	} = {}

	private refrshTokens: string[] = []

	async add(username: string, password: string) {
		const hash = await bcrypt.hash(password, 10)
		const id = nanoid()
		this.store[id] = {
			username,
			password: hash,
		}

		console.log(this.store)
	}

	async checkUser(user: IUser, password: string) {
		return await bcrypt.compare(user.password, password)
	}

	addRefreshToken(token: string) {
		this.refrshTokens.push(token)
	}

	refreshTokenExist(token: string) {
		return ~this.refrshTokens.indexOf(token)
	}

	dropRefreshToken(token: string) {
		this.refrshTokens = this.refrshTokens.filter((el) => token !== el)
	}

	makeToken(data: string | Buffer | object) {
		const accessToken = jwt.sign(data, JWT_ACCESS_SECRET, {
			expiresIn: `10s`,
		})

		const refreshToken = jwt.sign(data, JWT_REFRESH_SECRET)

		return { accessToken, refreshToken }
	}
}

export default new AuthService()
