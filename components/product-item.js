// product-item.js

class ProductItem extends HTMLElement {
  constructor(id, image, title, price) {
    super();

    let cart = JSON.parse(localStorage.getItem('Lab6Cart'));
    const count = document.querySelector("#cart-count");

    if (cart == null) {
      cart = {}
    }

    count.replaceChild(document.createTextNode(Object.keys(cart).length), count.firstChild);

    this.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.appendChild(document.createTextNode(`.price{color:green;font-size:1.8em;font-weight:700;margin:0}.product{align-items:center;background-color:#fff;border-radius:5px;display:grid;grid-template-areas:'image' 'title' 'price' 'add';grid-template-rows:67% 11% 11% 11%;height:450px;filter:drop-shadow(0 0 6px rgb(0,0,0,.2));margin:0 30px 30px 0;padding:10px 20px;width:200px}.product>button{background-color:#ffd000;border:none;border-radius:5px;color:#000;justify-self:center;max-height:35px;padding:8px 20px;transition:.1s ease all}.product>button:hover{background-color:#ffa600;cursor:pointer;transition:.1s ease all}.product>img{align-self:center;justify-self:center;width:100%}.title{font-size:1.1em;margin:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.title:hover{font-size:1.1em;margin:0;white-space:wrap;overflow:auto;text-overflow:unset}`));

    this.shadowRoot.appendChild(style);

    const li = this.createTag('li', {
      'class': 'product'
    });

    const img = this.createTag('img', {
      'src': image,
      'alt': title,
      'width': 200
    });

    const p1 = this.createTag('p', {
      'class': 'title'
    }, title);

    const p2 = this.createTag('p', {
      'class': 'price'
    }, `$${price}`);

    const button = this.createTag('button', {
      'onclick': `alert('Added to Cart!')`
    }, this.buttonText(cart[id]));

    button.addEventListener('click', () => {
      cart = JSON.parse(localStorage.getItem('Lab6Cart'));

      if (cart[id]) {
        delete cart[id];
      } else {
        cart[id] = true;
      }

      button.replaceChild(document.createTextNode(this.buttonText(cart[id])), button.firstChild);
      count.replaceChild(document.createTextNode(Object.keys(cart).length), count.firstChild);
      localStorage.setItem('Lab6Cart', JSON.stringify(cart));
    });

    li.append(img, p1, p2, button);

    this.shadowRoot.appendChild(li);
  }

  buttonText(inCart) {
    return inCart ? 'Remove from Cart' : 'Add to Cart';
  }

  createTag(tag, attributes, text) {
    const element = document.createElement(tag);

    for (let key in attributes) {
      element.setAttribute(key, attributes[key]);
    }

    if (text) {
      element.appendChild(document.createTextNode(text));
    }

    return element;
  }
}

customElements.define('product-item', ProductItem);
