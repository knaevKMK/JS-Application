import { lp, api } from '../lib.js';
import { note, temp } from './elements/note.js';

const tempCatalog = (data, onDelete) => lp.html `
<div id="car-listings">
    <h1>Car Listings</h1>

    <div id="listings">
        ${renderData(data, onDelete)}

    </div>
</div>
`;

function renderData(data, onDelete) {
    console.log(data);
    if (data.length == 0) {
        return lp.html `<p class="no-cars">No cars in database.</p>`;
    }
    return data.map(m => lp.html `<div class="listing">
    <p>${m.title}</p>
    <img src="${m.imageUrl}">
    <h2>Brand: ${m.brand}</h2>
    <div class="info">
        <div id="data-info">
            <h3>Seller: ${m.seller}</h3>
            <h3>Fuel: ${m.fuel}</h3>
            <h3>Year: ${m.year}</h3>
            <h3>Price: ${m.price} $</h3>
        </div>
        <div id="data-buttons">
            <ul>
                <li class="action">
                    <a href="/details/${m._id}" class="button-carDetails">Details</a>
                </li>
                ${sessionStorage.getItem('email') == m.seller
                ? lp.html` <li class="action">
                    <a href="edit/${m._id}" class="button-carDetails">Edit</a>
                </li>
                <li class="action">
                    <a @click=${onDelete} id=${m._id} href="javascript:void(0)" class="button-carDetails">Delete</a>
                </li>`
            : ''}
            </ul>
        </div>
    </div>

</div>`);
}
export async function pageCatalog(ctx) {
    // note(temp.loading());
    const data = await api.data.getAllItems();
    // note(lp.html``);
    console.log(data)
    ctx.render(tempCatalog(data, onDelete));


    async function onDelete() {
        const itemId = event.target.id;
        console.log(itemId)
        note(temp.loading());
        const response = await api.data.deleteItem(itemId);
        console.log(response);
        note(temp.info('Listing deleted.'));
        //TODO check redirect
        lp.page.redirect('')
    }
}