import { html } from "../../node_modules/lit-html/lit-html.js";
import page from '../../node_modules/page/page.mjs';
import { getCatalog, getShoeById } from "../api/data.js";

export const detailsTemp = (item, buyIt) => html `
<div class="offer-details">
    <h1>${item.brand + ' ' + item.name}</h1>
    <div class="info">
        <img src=${item.img} alt="">
        <div class="description">${item.description}
            <br>
          <p>Buyers: ${item.bought}</p>
            <br>
            <p class="price">$${item.price}</p>
        </div>
    </div>
    <div class="actions">
        ${item.creator == sessionStorage.getItem('id')
? html` <a href="/edit/${item._id}">Edit</a>
        <a href="/delete/${item._id}">Delete</a>`
  : html`        <a href="/buy/${item._id}">Buy</a>`
     }
    </div>
    ${buyIt ?
                    html`<span>You bought it</span>`
                    : ''
     }
</div>`;

export async function loadDetails(ctx, buyIt) {
    const itemId = ctx.params.id;
    console.log(itemId);
    const item = await getShoeById(itemId);
    //  console.log(item)
    ctx.render(detailsTemp(item));
}