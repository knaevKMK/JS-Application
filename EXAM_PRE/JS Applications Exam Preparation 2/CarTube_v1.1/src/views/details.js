import { _user } from '../api/utility.js';
import { lp, api } from '../lib.js';


//TODO add item proto & attach click for delete item
const tempDetail = (item, onDelete) => lp.html`
<section id="listing-details">
    <h1>Details</h1>
    <div class="details-info">
        <img src="${item.imageUrl}">
        <hr>
        <ul class="listing-props">
            <li><span>Brand:</span>${item.brand}</li>
            <li><span>Model:</span>${item.model}</li>
            <li><span>Year:</span>${item.year}</li>
            <li><span>Price:</span>${item.price}$</li>
        </ul>

        <p class="description-para">${item.decsription}</p>

        <div class="listings-buttons">

            ${_user.getUserData() && _user.getUserData()._id == item._ownerId
        ? lp.html` <a href="/edit/${item._id}" class="button-list">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" class="button-list">Delete</a>`
        : ''}

        </div>
    </div>
</section>`;

export async function pageDetails(ctx) {
    const itemId = ctx.params.id;
    const item = await api.data.getItemById(itemId)
    ctx.render(tempDetail(item, onDelete));

    async function onDelete() {
        await api.data.deleteItem(itemId)
        //TODO check redirect
        lp.page.redirect('/catalog')
    }
}