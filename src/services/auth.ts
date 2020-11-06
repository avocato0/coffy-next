import bcrypt from 'bcryptjs'
import type { IUserAuth } from 'models/user'
import jwt from 'jsonwebtoken'
import {
	JWT_ACCESS_SECRET,
	JWT_REFRESH_SECRET,
	LoginMessage,
} from 'constants/auth'
import db from 'db'
import { copyWithoutProps } from 'utils/helpers'

export interface ITokens {
	accessToken: string
	refreshToken: string
}

class AuthService {
	private refrshTokens: ITokens['refreshToken'][] = []

	async add(username: string, password: string) {
		const hash = await bcrypt.hash(password, 10)

		// this.store[id] = {
		// 	username,
		// 	password: hash,
		// }

		// console.log(this.store)
	}

	async checkUser(user: IUserAuth, password: string) {
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

	makeToken(data: string | Buffer | object): ITokens {
		const accessToken = jwt.sign(data, JWT_ACCESS_SECRET, {
			expiresIn: `10s`,
		})

		const refreshToken = jwt.sign(data, JWT_REFRESH_SECRET)

		return { accessToken, refreshToken }
	}

	async signin(user: IUserAuth) {
		const dbUser = await db.query.userByEmail(user)
		if (!dbUser) throw new Error(LoginMessage.USER_NOT_EXISTS)

		const compare = await bcrypt.compare(user.password, dbUser.password)
		if (!compare) throw new Error(LoginMessage.WRONG_PASSWORD)

		const tokens = this.makeToken({ id: dbUser.id })
		this.addRefreshToken(tokens.refreshToken)

		return {
			user: copyWithoutProps(dbUser, 'password'),
			tokens,
		}
	}
}

export default new AuthService()
