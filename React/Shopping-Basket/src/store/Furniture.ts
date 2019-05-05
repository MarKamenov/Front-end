import { observable, action, computed } from 'mobx';
import { furnitureResponse } from '../data/data';
import { IFurnitureResponse } from '../types';
export default class FurnitureStore {
	@observable public list: IFurnitureResponse[] = [];
	@observable public addedItems: number = 0;
	@observable public quantity: number = 1;
	@observable public selectedItems: IFurnitureResponse[] = [];

	@action
	public async fetchFurniture() {
		try {
			const response = await furnitureResponse().then(furniture => (this.list = furniture));
			this.list = response;
		} catch (e) {
			throw e;
		}
	}

	@computed
	get itemsAdded(): number {
		return this.addedItems;
	}
}
