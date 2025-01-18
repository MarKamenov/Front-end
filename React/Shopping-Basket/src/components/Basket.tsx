import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Box, Flex } from 'grid-styled';
import styled from 'styled-components';
import Furniture from '../store/Furniture';

interface IBasketProps {
	className?: string;
}
@inject('furniture')
@observer
class Basket extends React.Component<IBasketProps> {
	private readonly tax: number = 0.15;

	constructor(props: IBasketProps) {
		super(props);
	}
	get injected() {
		return this.props as {
			furniture: Furniture;
		};
	}

	public removeFromBasket = () => {
		this.injected.furniture.selectedItems = [];
	};

	public render() {
		const { itemsAdded, totalAmount } = this.injected.furniture;

		return (
			<Box p={3} className={this.props.className}>
				<Flex justifyContent="space-between">
					<Box>Added items:</Box>
					<Box>{itemsAdded || 0}</Box>
				</Flex>
				<Flex justifyContent="space-between">
					<Box>total price:</Box>
					<Box ml={2}>${totalAmount}</Box>
				</Flex>
				<Flex justifyContent="space-between" mt={2}>
					<Box>tax (15%):</Box>
					<Box ml={2}>${totalAmount ? (totalAmount * this.tax).toFixed(2) : 0}</Box>
				</Flex>
				<Flex justifyContent="space-between" mt={2}>
					<Box>total inc tax:</Box>
					<Box>${totalAmount ? (totalAmount + totalAmount * this.tax).toFixed(2) : 0}</Box>
				</Flex>
				<Flex justifyContent="space-between" mt={2}>
					<Box>remove all</Box>
					<Box className="remove_item" onClick={() => this.removeFromBasket()}>
						<i className="material-icons">remove</i>
					</Box>
				</Flex>
			</Box>
		);
	}
}

export default styled(Basket)`
	background-color: rgb(230, 227, 178);
	box-shadow: 0px 0px 8px olive;
	width: 200px;
	color: #100f0e;
	.material-icons {
		cursor: pointer;
		background: olive;
		color: white;
		border-radius: 50%;
	}
`;
