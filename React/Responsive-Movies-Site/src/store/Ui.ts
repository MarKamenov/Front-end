import { observable } from 'mobx';

class UI {
	@observable public toggleMenu = false;

	public toggle= () => {
		this.toggleMenu = !this.toggleMenu;
	};
}
export default UI;