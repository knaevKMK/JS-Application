import { lp, api } from '../lib.js';
import { note, temp } from './elements/note.js';


//TODO add item proto & attach click for delete item
const tempDetail = (item, onDelete) => lp.html `<div class="listing-details">
    <div class="my-listing-details">
        <p id="auto-title">${item.title}</p>
        <img src="${item.imageUrl}">
        <div class="listing-props">
            <h2>Brand: ${item.brand}</h2>
            <h3>Model: ${item.model}</h3>
            <h3>Year: ${item.year}</h3>
            <h3>Fuel: ${item.fuel}</h3>
            <h3>Price: ${item.price}$</h3>
        </div>
        <div class="listings-buttons">
            ${sessionStorage.getItem('email') == item.seller
        ? lp.html` <a href="/edit/${item._id}" class="button-list">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" class="button-list">Delete</a>`
        : ''
    }
        </div>
        <p id="description-title">Description:</p>
        <p id="description-para">${item.description}</p>

    </div>
</div>`;

export async function pageDetails(ctx) {
    const itemId = ctx.params.id;
    const item = await api.data.getItemById(itemId)
    ctx.render(tempDetail(item, onDelete));

    async function onDelete() {
        await api.data.deleteItem(itemId)
        note(temp.info('Successful deleted!'))
        lp.page.redirect('')
    }
}