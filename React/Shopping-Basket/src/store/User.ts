import { action, observable } from 'mobx';
import { userResponse } from '../data/user';
export default class UserStore {
	@observable public username: string = '';

	constructor() {
		this.getUser();
	}

	@action.bound
	private async getUser() {
		try {
			const user = await userResponse().then(user => user);
			this.username = user.name;
		} catch (e) {
			throw e;
		}
	}
}
