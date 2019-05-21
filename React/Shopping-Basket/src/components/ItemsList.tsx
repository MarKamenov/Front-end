import * as React from 'react';
import { Box, Flex } from 'grid-styled';
import { IFurnitureResponse } from '../types';
import styled from 'src/theme';

interface IFurnitureItems {
	className?: string;
	onAdd: (product: IFurnitureResponse) => void;
	onRemove: (product: IFurnitureResponse) => void;
	item: IFurnitureResponse;
}

const UnstyledItemsList = (props: IFurnitureItems) => {
	const { onAdd, onRemove, className, item } = props;
	return (
		<Box p={1} m={3} className={className}>
			<Flex className="item_wrapper" flexDirection="column">
				<img src={item.image} alt={item.model} />
				<Flex mt={1} flexDirection="row" alignItems="center" flexWrap="wrap" justifyContent="space-between">
					<Box className="card-title">{item.make}</Box>
					<Box>{item.model}</Box>
					<Box>
						<b>Price: {item.price}$</b>
					</Box>
					<Box className="remove_item" onClick={() => onRemove(item)}>
						<i className="material-icons">remove</i>
					</Box>
					<Box className="add_item" onClick={() => onAdd(item)}>
						<i className="material-icons">add</i>
					</Box>
				</Flex>
			</Flex>
		</Box>
	);
};

const ItemsList = styled(UnstyledItemsList)`
	.item_wrapper {
		width: 300px;
		height: 200px;
		box-shadow: 3px 3px 8px 0px rgba(0, 0, 0, 0.3);
	}
	img {
		width: 100%;
		height: 100%;
	}
`;
export default ItemsList;
