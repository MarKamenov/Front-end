import * as React from 'react';
import { Flex, Box } from 'grid-styled';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import ShoppingBasket from '../assets/ShoppingBasket';
import Basket from './Basket';
import UI from '../store/Ui';

export interface IHeaderProps {
	className?: string;
	// hamburgerMenu: JSX.Element;
	// logo: JSX.Element;
	// accountMenu: JSX.Element;
}
@inject('ui')
@observer
class UnstyledHeader extends React.Component<IHeaderProps> {
	constructor(props: IHeaderProps) {
		super(props);
	}

	get injected() {
		return this.props as {
			ui: UI;
		};
	}

	public render() {
		const { className } = this.props;
		const { ui } = this.injected;

		return (
			<div className={className}>
				<Flex justifyContent="space-between" p={2} width={1} className={className}>
					<Box>Shopping</Box>
					<Flex>
						<Box className="menu_toggle" onClick={() => ui.toggleCart()}>
							<ShoppingBasket />
							<Box
								onClick={e => {
									// don't hide if clicked
									e.stopPropagation();
								}}
								className={ui.toggleBasket ? 'open' : 'closed'}
							>
								<Basket />
							</Box>
						</Box>
						<Box>Basket</Box>
					</Flex>
				</Flex>
			</div>
		);
	}
}

const Header = styled(UnstyledHeader)`
	background-color: olive;
	color: white;
	svg {
		width: 35px;
		height: 15px;
		&:hover {
			color: #ecbe13;
			cursor: pointer;
		}
	}
	.menu_toggle {
		position: relative;
	}
	.closed,
	.open {
		list-style-type: none;
		box-shadow: 0px 0px 3px #888888;
		position: absolute;
		top: 3rem;
		right: -1rem;
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
export default Header;
