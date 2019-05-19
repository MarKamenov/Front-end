import * as React from 'react';
import styled from 'styled-components';
import { ButtonHTMLAttributes } from 'react';
import HamburgerMenu from '../assets/HamburgerMenu';

export interface ICleanButtonProps {
	className?: string;
}

const HamburgerButton: React.SFC<ButtonHTMLAttributes<ICleanButtonProps>> = ({ className, ...rest }) => (
	<button className={className} {...rest}>
			<HamburgerMenu color='#001e2d' />
	</button>
);

export default styled(HamburgerButton)`
	padding-top: 2px;;
	margin: 0;
	background: none;
	border: none;
	font: inherit;
	color: inherit;
	cursor: pointer;
	outline:none;
`;
