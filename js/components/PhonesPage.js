import Component from "../Component.js";
import { getAll, getById } from "../api/phones.js";
import Filter from "./Filter.js";
import PhonesCatalogue from "./PhonesCatalogue.js";
import PhoneViewer from "./PhoneViewer.js";
import ShoppingCart from "./ShoppingCart.js";
export default class PhonesPage extends Component {
	constructor(element) {
		super(element);
		this.state = {
			phones: getAll().slice(0, 5),
			selectedPhone: null,
			items: {
				qwqwd: 1,
				asd: 2,
			},
		};
		this.onPhoneSelected = (phoneId) => this.selectPhone(phoneId);
		this.onAdd = (phoneId) => this.addItem(phoneId);
		this.onBack = () => this.unSelectPhone(null);
		this.onPhoneSelected = (phoneId) => this.selectPhone(phoneId);
		this.onDelete = (itemToRemove) => {
			this.removeItem(itemToRemove);
		};

		this.render();
	}
	addItem(item) {
		const oldItems = this.state.items;

		const items = {
			...oldItems,
			[item]: oldItems[item] ? oldItems[item] + 1 : 1,
		};
		this.setState({ items: items });
	}
	removeItem(itemToRemove) {
		const newItems = this.state.items;
		delete newItems[itemToRemove];
		this.setState({
			items: newItems,
		});
	}
	selectPhone(phoneId) {
		this.setState({
			selectedPhone: getById(phoneId),
		});
	}
	unSelectPhone() {
		{
			return this.setState({
				selectedPhone: null,
			});
		}
	}
	initComponent(Constructor, props = {}) {
		const componentName = Constructor.name;
		const element = this.element.querySelector(
			`[data-component="${componentName}"]`
		);
		if (element) {
			new Constructor(element, props);
		}
	}
	init() {
		this.initComponent(PhonesCatalogue, {
			phones: this.state.phones,

			onPhoneSelected: this.onPhoneSelected,

			onAdd: this.onAdd,
		});

		this.initComponent(PhoneViewer, {
			phone: this.state.selectedPhone,
			onBack: this.onBack,
			onAdd: this.onAdd,
		});
		this.initComponent(Filter);

		this.initComponent(ShoppingCart, {
			items: this.state.items,

			onDelete: this.onDelete,
		});
	}
	render() {
		this.element.innerHTML = `
        <div class="row">

        <!--Sidebar-->
        <div class="col-md-2">
          <section>
          <div data-component="Filter"> </div>
          </section>
  
          <section>
          <div data-component="ShoppingCart"> </div>
          </section>
        </div>
  
        <!--Main content-->
        <div class="col-md-10">
        ${
									this.state.selectedPhone
										? `<div data-component="PhoneViewer"></div>`
										: `<div data-component="PhonesCatalogue"></div>`
								}
        
        </div>
      </div>
        `;
		this.init();
	}
}
