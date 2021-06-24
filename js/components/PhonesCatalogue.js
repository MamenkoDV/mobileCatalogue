import Component from "../Component.js";
export default class PhonesCatalogue extends Component {
	constructor(element, props) {
		super(element, props);

		this.render();
		this.on("click", "PhoneLink", (event) => {
			const phoneId = event.delegateTarget.dataset.phoneID;
			this.props.onPhoneSelected(phoneId);
		});
		this.on("click", "AddToCart", (event) => {
			const phoneId = event.delegateTarget.dataset.phoneId;
			this.props.onAdd(phoneId);
		});
	}
	render() {
		this.element.innerHTML = `
        <div>
        <ul class="phones">
        ${this.props.phones
									.map(
										(phone) => `   <li class="thumbnail">
        <a href="#!/phones/${phone.id}" class="thumb"
        data-element="PhoneLink"
        data-phone-id="${phone.id}"
        >
          <img alt="${phone.name}" src="${phone.imageUrl}">
        </a>

        <div class="phones__btn-buy-wrapper" >
          <a class="btn btn-success" 
		  data-element= "AddToCart"
		data-phone-id="${phone.id}">
            Add
          </a>
        </div>

        <a href="#!/phones/${phone.id}"
        data-element="PhoneLink"
        data-phone-id="${phone.id}"
        >${phone.name}</a>
        <p>${phone.snippet}</p></li> `
									)
									.join("")}  
      </ul>
        </div>
        `;
	}
}
