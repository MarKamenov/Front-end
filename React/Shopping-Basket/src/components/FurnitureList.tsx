import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Flex, Box } from 'grid-styled';
import styled from 'styled-components';
import Furniture from '../store/Furniture';
import ItemsList from './ItemsList';

interface IFurnitureListProps {
	className?: string;
}

@inject('furniture')
@observer
class FurnitureList extends React.Component<IFurnitureListProps> {
	constructor(props: IFurnitureListProps) {
		super(props);
	}
	get injected() {
		return this.props as {
			furniture: Furniture;
		};
	}

	public componentDidMount() {
		this.injected.furniture.fetchFurniture();
	}

	public addToBasket = (id: number) => {
		this.injected.furniture.addedItems += 1;
		const addedItem = this.injected.furniture.list.find(item => item.id === id);
		const existedItem = this.injected.furniture.selectedItems.find(item => item.id === id);
		if (existedItem) {
			this.injected.furniture.quantity += 1;
		} else if (addedItem) {
			this.injected.furniture.quantity = 1;
			this.injected.furniture.selectedItems.push(addedItem);
		}
	};

	public removeFromBasket = () => {
		this.injected.furniture.addedItems -= 1;
	};

	public render() {
		const { list } = this.injected.furniture;
		return (
			<Box className={this.props.className}>
				<h3 className="center">Our items</h3>
				<Flex flexWrap="wrap">
					{list.map(item => <ItemsList key={item.id} item={item} onAdd={this.addToBasket} />)}
				</Flex>
			</Box>
		);
	}
}

export default styled(FurnitureList)`
	.material-icons {
		cursor: pointer;
		background: olive;
		color: white;
		border-radius: 50%;
	}
	.center {
		text-align: center;
	}
`;
