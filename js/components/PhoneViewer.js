import Component from "../Component.js";

export default class PhoneViewer extends Component {
	constructor(element, props) {
		super(element, props);

		this.render();
		this.on("click", "BackButton", () => {
			this.props.onBack();
		});
		this.on("click", "AddToCart", () => {
			this.props.onAdd(this.props.phone.id);
		});
		this.on("click", "deleteFromBascet", () => {
			this.props.onDelete(this.props.phone.id);
		});
	}
	render() {
		const { phone } = this.props;
		this.element.innerHTML = `
        <div>
          <img class="phone" src="${phone.images[0]}">
    
          <button data-element= "BackButton">Back</button>
          <button data-element= "AddToCart">Add to Shoping Cart</button>
    
    
          <h1>${phone.name}</h1>
    
          <p>${phone.description}</p>
          <ul class="phone-thumbs">
          ${phone.images
											.map(
												(item, index) =>
													`<li>
          <img src="${phone.images[index]}">
          </li>`
											)
											.join("")}
        </ul>
        <div/>
        `;
	}
}
