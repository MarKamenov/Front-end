import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Box } from 'grid-styled';
import styled from 'styled-components';
import Furniture from '../store/Furniture';

interface IBasketProps {
	className?: string;
}
@inject('furniture')
@observer
class Basket extends React.Component<IBasketProps> {
	constructor(props: IBasketProps) {
		super(props);
	}

	get injected() {
		return this.props as {
			furniture: Furniture;
		};
	}

	public render() {
		const { selectedItems } = this.injected.furniture;
		const price = selectedItems.reduce((total, item) => total + item.price!, 0);
		const tax = price * 0.15;
		return (
			<Box className={this.props.className}>
				<Box>Added items: {this.injected.furniture.addedItems}</Box>
				<h3 style={{ fontWeight: 400 }}>
					<span>total price:</span>
					<span className="col-6 text-right">${price}</span>
				</h3>
				<h3 style={{ fontWeight: 400 }}>
					<span>tax (15%):</span>
					<span className="col-6 text-right">${(price * 0.15).toFixed(2)}</span>
				</h3>
				<h3>
					<span>tota inc tax:{(price + tax).toFixed(2)}</span>
					<span>$</span>
				</h3>
				<Box className="remove_item" onClick={() => null}>
					remove all<i className="material-icons">remove</i>
				</Box>
			</Box>
		);
	}
}

export default styled(Basket)`
	.material-icons {
		cursor: pointer;
		background: olive;
		color: white;
		border-radius: 50%;
	}
`;
