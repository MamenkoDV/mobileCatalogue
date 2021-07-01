import Component from "../Component.js";

export default class ShoppingCart extends Component {
	constructor(element, props) {
		super(element, props);
		this.render();
		this.on("click", "deleteFromBascet", (event) => {
			const deleteItem = event.delegateTarget.dataset.item;
			this.props.onDelete(deleteItem);
		});
	}
	render() {
		const { items } = this.props;
		this.element.innerHTML = `
        <div>
        <h4>Shopping Cart</h4>
        <ul>
        ${Object.keys(items)
									.map(
										(item) => `
        <li>${item} - ${items[item]}
        <button data-element= "deleteFromBascet"
        data-item= "${item}"
        >X</button> 
        </li>`
									)
									.join("")} 
        </ul>
        </div>
        
        `;
	}
}
