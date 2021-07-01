import Component from "../Component.js";

export default class PhoneViewer extends Component {
	constructor(element, props) {
		super(element, props);
		this.state = {
			selectedImage: this.props.phone.images[0],
		};
		this.render();
		this.on("click", "BackButton", () => {
			this.props.onBack();
		});
		this.on("click", "AddToCart", () => {
			this.props.onAdd(this.props.phone.id);
		});
		this.on("click", "smallImage", (event) => {
			const imageUrl = event.delegateTarget.dataset.imageUrl;
			this.setState({
				selectedImage: imageUrl,
			});
		});
	}
	render() {
		const { phone } = this.props;
		this.element.innerHTML = `
        <div>
          <img class="phone" src="${this.state.selectedImage}">
    
          <button data-element= "BackButton">Back</button>
          <button data-element= "AddToCart">Add to Shoping Cart</button>
    
    
          <h1>${phone.name}</h1>
    
          <p>${phone.description}</p>
          <ul class="phone-thumbs">
          ${phone.images
											.map(
												(imageUrl) =>
													`<li data-element= "smallImage" data-image-url = "${imageUrl}">
          <img src="${imageUrl}">
          	</li>`
											)
											.join("")}
        </ul>
        <div/>
        `;
	}
}
