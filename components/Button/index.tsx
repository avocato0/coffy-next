import React from 'react'
import styles from './Button.module.scss'

export interface IButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: React.FC<IButtonProps> = ({
	type = 'button',
	value = '',
}) => {
	return (
		<button className={styles.Component} type={type}>
			{value}
		</button>
	)
}
