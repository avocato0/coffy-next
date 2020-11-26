import { FC, useState } from 'react'
import StyledButton, { ANIM_DURATION } from './style'

export const Button: FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
	children,
	type = 'button',
	...attrs
}) => {
	const [clicked, setClicked] = useState<boolean>(false)

	return (
		<StyledButton
			onMouseUp={() => {
				setClicked(true)
				setTimeout(() => setClicked(false), ANIM_DURATION)
			}}
			type={type}
			clicked={clicked}
			{...attrs}>
			{children}
		</StyledButton>
	)
}
