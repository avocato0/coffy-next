import { Button, Label, Container } from 'components'

const SignIn = () => {
	return (
		<Container>
			<form>
				<Label
					title='Почта'
					input={{
						name: 'email',
					}}
				/>
				<Label
					title='Пароль'
					input={{
						type: 'password',
						name: 'password',
					}}
				/>
				<Button value='Авторизоваться' />
			</form>
		</Container>
	)
}

export default SignIn
