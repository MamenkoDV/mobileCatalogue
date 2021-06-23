export default class PhoneViewer {
	constructor(element, props) {
		this.element = element;
		this.props = props;
		this.render();
		this.element.addEventListener("click", (event) => {
			const button = event.target.closest('[data-element= "BackButton"]');
			console.log("click");

			if (!button) {
				return;
			}
			this.props.onBack();
		});
	}
	render() {
		const { phone } = this.props;
		this.element.innerHTML = `
        <div>
          <img class="phone" src="${phone.images[0]}">
    
          <button data-element= "BackButton">Back</button>
          <button>Add to basket</button>
    
    
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
