import { getAll, getById } from "../api/phones.js";
import Filter from "./Filter.js";
import PhonesCatalogue from "./PhonesCatalogue.js";
import PhoneViewer from "./PhoneViewer.js";
import ShoppingCart from "./ShoppingCart.js";
export default class PhonesPage {
	constructor(element) {
		this.element = element;

		this.state = {
			phones: getAll(),
			selectedPhone: getById(),
		};
		this.render();
		this.initComponent(Filter);
		this.initComponent(ShoppingCart);
		this.initComponent(PhonesCatalogue, {
			phones: this.state.phones,
		});
		this.initComponent(PhoneViewer, {
			phone: this.state.selectedPhone,
		});
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
	render() {
		console.log(this.state);
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
	}
}
