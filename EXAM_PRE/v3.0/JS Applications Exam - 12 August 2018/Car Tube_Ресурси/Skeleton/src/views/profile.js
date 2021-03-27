import { api, lp } from '../lib.js';
import { note, temp } from './elements/note.js';


//this user data include all items create by itself
const tempMyListings = (data, onDelete) => lp.html `
<div class="my-listings">
    <h1>My car listings</h1>
    <div class="car-listings">

        ${renderData(data, onDelete)}

    </div>
</div>`;

function renderData(data, onDelete) {
    console.log(data);
    if (data.length == 0) {
        return lp.html `<p class="no-cars"> No cars in database.</p>`;
    }
    return data.map(m => lp.html `<div class="my-listing">
    <p id="listing-title">${m.title}</p>
    <img src="${m.imageUrl}">

    <div class="listing-props">
        <h2>Brand: ${m.brand}</h2>
        <h3>Model: ${m.model}</h3>
        <h3>Year: ${m.year}</h3>
        <h3>Price: ${m.price}$</h3>
    </div>
    <div class="my-listing-buttons">
        <a href="/details/${m._id}" class="my-button-list">Details</a>
        <a href="/edit/${m._id}" class="my-button-list">Edit</a>
        <a id=${m._id} @click=${onDelete} href="" class="my-button-list">Delete</a>
    </div>
</div>`);
}

export async function pageMyListings(ctx) {
    // note(temp.loading());
    const items = await api.data.getMyItems(sessionStorage.getItem('email'));

    ctx.render(tempMyListings(items, onDelete));
    async function onDelete() {
        const itemId = event.target.id;
        console.log(itemId)
            // note(temp.loading());
        await api.data.deleteItem(itemId)
        note(temp.info('Listing deleted.'))
            //TODO check redirect
        lp.page.redirect('')
    }
}