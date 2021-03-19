import { html } from "../../node_modules/lit-html/lit-html.js";
import page from '../../node_modules/page/page.mjs';
import { getCatalog, getShoeById } from "../api/data.js";

const detailsTemp = (item) => html `
<div class="offer-details">
    <h1>${item.brand + ' ' + item.name}</h1>
    <div class="info">
        <img src=${item.img} alt="">
        <div class="description">${item.description}
            <br>
            <br>
            <p class="price">$${item.price}</p>
        </div>
    </div>
    <div class="actions">
        ${item._creatorId == sessionStorage.getItem('id')
                ? html` <a href="/edit/${item._id}">Edit</a>
        <a href="/delete/${item._id}">Delete</a>`
              : html` <a href="/buy/${item._id}">Buy</a>`
       }
    </div>
</div>`;

export async function loadDetails(ctx) {
    const itemId = ctx.params.id;
    console.log(ctx);
   const item = await getShoeById(itemId);
  //  console.log(item)
    ctx.render(detailsTemp(item));
}