import * as React from 'react';
import { Box } from 'grid-styled';
import styled from 'styled-components';
import HamburgerButton from './Button';
import HamburgerMenu from '../assets/HamburgerMenu';

export interface INavBarProps {
	className?: string;
}

export interface IMenuState {
	open: boolean;
}
class UnstyledNavBar extends React.Component<INavBarProps, IMenuState> {
	constructor(props: INavBarProps) {
		super(props);
		this.state = { open: false };
	}

	public toggleOpen = () => {
				this.setState({ open: !this.state.open });
			};

	public render() {
		const { className } = this.props;

		return (
			<div className={className}>			
						<Box className="menu_toggle" onClick={this.toggleOpen}>
						<HamburgerButton onClick={this.toggleOpen}>
								<HamburgerMenu />
					 </HamburgerButton>
							<Box
								onClick={e => {
									// don't hide if clicked
									e.stopPropagation();
								}}
								className={this.state.open ? 'open' : 'closed'}
							>
								{this.props.children}
							</Box>
						</Box>
			</div>
		);
	}
}

const NavBar = styled(UnstyledNavBar)`
	background-color: ${props => props.theme.foregroundFourth};
	position: absolute;
  bottom: 50px;
  right: 70px;
	z-index:10;
	svg {
		width: 35px;
		height: 15px;
	}
	.menu_toggle {
		position: relative;
		padding:5px;
	}
	.closed,
	.open {
		list-style-type: none;
		box-shadow: 0px 0px 3px #888888;
		position: absolute;
		top: -6rem;
		right: 0;
		color: orange;
		transition: transform 0.3s ease-in-out;
	}
	.closed {
		visibility: hidden;
		transform: scale(0);
	}
	.open {
		visibility: visible;
		transform: scale(1);
		z-index: 10;
	}
`;
export default NavBar;