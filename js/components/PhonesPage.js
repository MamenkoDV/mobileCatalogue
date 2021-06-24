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
			phones: getAll(),
			selectedPhone: null,
			items: [],
		};
		this.render();
	}

	initComponent(Constructor, props = {}) {
		const componentName = Constructor.name;
		const element = this.element.querySelector(
			`[data-component="${componentName}"]`
		);
		console.log(element, componentName);
		if (element) {
			new Constructor(element, props);
		}
	}
	init() {
		this.initComponent(Filter);
		this.initComponent(ShoppingCart, { items: this.state.items });
		this.initComponent(PhonesCatalogue, {
			phones: this.state.phones,
			onPhoneSelected: (phoneId) => {
				this.setState({
					selectedPhone: getById(phoneId),
				});
			},
			onAdd: (phoneId) => {
				this.setState({
					items: [...this.state.items, phoneId],
				});
			},
		});
		this.initComponent(PhoneViewer, {
			phone: this.state.selectedPhone,

			onBack: () => {
				this.setState({
					selectedPhone: null,
				});
			},
			onAdd: (phoneId) => {
				this.setState({
					items: [...this.state.items, phoneId],
				});
			},
			onDelete: (phoneId) => {
				this.setState({
					items: [...this.state.items],
				});
			},
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
