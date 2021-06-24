import Component from "../Component.js";

export default class ShoppingCart extends Component {
	constructor(element, props) {
		super(element, props);
		this.render();
	}
	render() {
		const { items } = this.props;
		this.element.innerHTML = `
        <div>
        <h4>Shopping Cart</h4>
        <ul>
        ${items
									.map(
										(item) => `
        <li>${item}
        <button data-element= "deleteFromBascet">X</button> 
        </li>`
									)
									.join("")} 
        </ul>
        </div>
        
        `;
	}
}
