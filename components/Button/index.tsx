import React, { useState } from 'react'
import cl from 'classnames'
import styles from './Button.module.scss'

export interface IButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: React.FC<IButtonProps> = ({
	type = 'button',
	value = '',
}) => {
	const [clicked, setClicked] = useState<boolean>()

	return (
		<button
			className={cl(styles.Component, {
				[styles.ComponentActive]: clicked,
			})}
			type={type}
			onMouseUp={() => {
				setClicked(true)
				setTimeout(setClicked, 500)
			}}>
			{value}
		</button>
	)
}
