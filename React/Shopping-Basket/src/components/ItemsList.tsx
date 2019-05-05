import * as React from 'react';
import { Box, Flex } from 'grid-styled';
import { IFurnitureResponse } from '../types';
import styled from 'src/theme';

interface IFurnitureItems {
	className?: string;
	onAdd: (id: number) => void;
	item: IFurnitureResponse;
}

const UnstyledItemsList = (props: IFurnitureItems) => {
	const {
		onAdd,
		className,
		item: { id, image, model, make, price },
	} = props;
	const addedItemPrice = () => onAdd(id);
	return (
		<Box p={1} m={3} className={className}>
			<Flex className="item_wrapper" flexDirection="column">
				<img src={image} alt={model} />
				<Flex mt={1} flexDirection="row" alignItems="center" flexWrap="wrap" justifyContent="space-between">
					<Box className="card-title">{make}</Box>
					<Box>{model}</Box>
					<Box>
						<b>Price: {price}$</b>
					</Box>
					<Box className="add_item" onClick={addedItemPrice}>
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
