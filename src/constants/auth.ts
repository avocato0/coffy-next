export const JWT_ACCESS_SECRET = `secret`
export const JWT_REFRESH_SECRET = `secret-refresh`

export const RegisterMessage = {
	USER_ALREADY_REGISTER: `Пользователь с таким email уже зарегистрирован`,
	WRONG_EMAIL: `Неправильный email`,
	REQUIRED_FIELD: `Поле обязательно для заполнения`,
	MIN_PASSWORD_LENGTH: `Пароль должен быть не меньше 6 символов`,
	MAX_PASSWORD_LENGTH: `Пароль должен быть не больше 12 символов`,
	PASSWORDS_NOT_EQUALS: `Пароли не совпадают`,
	EMPTY_VALUE: `Не указано значение`,
}

export const LoginMessage = {
	USERID_NOT_EXISTS: `Пользователь не найден`,
	USER_NOT_EXISTS: `Пользователь с таким email не зарегистрирован`,
	WRONG_PASSWORD: `Неправильно введён логин или пароль`,
	WRONG_EMAIL: `Неправильный email`,
	REQUIRED_FIELD: `Поле обязательно для заполнения`,
}

export const AuthMessage = {
	UNAUTHORIZED: `Не авторизован`,
}

export const MIN_PASSWORD_LENGTH = 6
export const MAX_PASSWORD_LENGTH = 12
