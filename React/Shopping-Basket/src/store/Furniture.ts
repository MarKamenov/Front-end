import { observable, action, computed } from 'mobx';
import { furnitureResponse } from '../data/data';
import { IFurnitureResponse } from '../types';
export default class FurnitureStore {
	@observable public list: IFurnitureResponse[] = [];
	@observable public quantity: number = 1;
	@observable public selectedItems: IFurnitureResponse[] = [];

	public init() {
		this.fetchFurniture();
	}

	@action
	public async fetchFurniture() {
		try {
			const response = await furnitureResponse().then(furniture => (this.list = furniture));
			this.list = response;
		} catch (e) {
			console.error(e);
			throw e;
		}
	}

	@computed
	get itemsAdded() {
		return this.selectedItems.length;
	}

	@computed
	get totalAmount() {
		const price = this.selectedItems.reduce((total, item) => total + item.price!, 0);
		return price;
	}

	@action.bound
	public addToCart(product: IFurnitureResponse) {
		this.selectedItems.push(product);
	}

	@action.bound
	public removeFromChart(product: IFurnitureResponse) {
		const index = this.selectedItems.indexOf(product);
		if (index >= 0) {
			this.selectedItems.splice(index, 1);
		}
	}
}
