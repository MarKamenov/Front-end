import { observable } from 'mobx';

class UI {
	@observable public toggleBasket = false;

	public toggleCart = () => {
		this.toggleBasket = !this.toggleBasket;
	};
}
export default UI;
