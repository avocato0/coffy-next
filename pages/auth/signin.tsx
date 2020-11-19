import { Button, Label, Container, Form } from 'components'
import { useState } from 'react'

const SignIn = () => {
	const [email, setEmail] = useState<string>('0.snilcy@gmail.com')
	const [password, setPassword] = useState<string>('123456')
	const [inValid, setValid] = useState<boolean>(!(email && password))

	return (
		<Container>
			<Form
				onSubmit={async (evt) => {
					evt.preventDefault()
				}}>
				<Label
					title='Почта'
					input={{
						name: 'email',
						value: email,
						autoComplete: 'username',
						onInput: ({ target }) => {
							setEmail(target.value)
							setValid(!(target.value && password))
						},
					}}
				/>
				<Label
					title='Пароль'
					input={{
						type: 'password',
						name: 'password',
						value: password,
						autoComplete: 'current-password',
						onInput: ({ target }) => {
							setPassword(target.value)
							setValid(!(email && target.value))
						},
					}}
				/>
				<Button
					type='submit'
					value='Авторизоваться'
					disabled={inValid}
				/>
			</Form>
		</Container>
	)
}

export default SignIn
