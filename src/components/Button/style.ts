import styled, { css } from 'styled-components'
export const ANIM_DURATION = 250

export default styled.button<{ clicked: boolean }>`
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

	&::after {
		content: '';
		position: absolute;
		left: 50%;
		top: 50%;
		width: 100%;
		height: 100%;
		background-color: inherit;
		transform: translate(-50%, -50%);
		z-index: -1;
		border-radius: inherit;
		pointer-events: none;
		opacity: 0.8;

		${(props) =>
			props.clicked &&
			css`
				opacity: 0;
				transition: all ${ANIM_DURATION / 1000}s ease-out;
				height: calc(100% + 1.5rem);
				width: calc(100% + 1.5rem);
			`}
	}
`
