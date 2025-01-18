import Furniture from './Furniture';
import User from './User';
import UI from './Ui';

export class Root {
	public furniture = new Furniture();
	public user = new User();
	public ui = new UI();

	constructor() {
		Object.keys(this).forEach(storeName => this[storeName].init());
	}
}

const stores = new Root();

(window as any).stores = stores;

export default stores;
