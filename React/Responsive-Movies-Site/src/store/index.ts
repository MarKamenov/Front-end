import Movies from './Movies';
import UI from './Ui';

export class Root {
	public movies = new Movies();
	public ui = new UI();

	constructor() {
		Object.keys(this).forEach(storeName => this[storeName].init && this[storeName].init());
	}
}

const stores = new Root();

(window as any).stores = stores;

export default stores;
