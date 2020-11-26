import styled from 'styled-components'

export interface IButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const StyledButton = styled.button`
	display: block;
	color: var(--color-white);
	background-color: var(--color-main);
	border: none;
	padding: 1.5rem 2.5rem;
	border-radius: 0.5rem;
	cursor: pointer;
	font-weight: 500;
	font-size: 1.75rem;
	position: relative;
	z-index: 0;

	&:hover {
		opacity: 0.9;
	}

	&:disabled {
		pointer-events: none;
		background-color: var(--color-gray-10);
	}
`
