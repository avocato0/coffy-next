import { Button, Label, Container, Form } from 'components'

const SignIn = () => {
	return (
		<Container>
			<Form>
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
			</Form>
		</Container>
	)
}

export default SignIn
