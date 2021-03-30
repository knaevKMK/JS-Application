import { lp, api } from '../lib.js';


//TODO add item proto & attach click for delete item
const tempDetail = (item, onDelete) => lp.html `<main id="site-content">
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

            <p class="description-para">${item.description}</p>

            <div class="listings-buttons">
                ${renderButtons(item, onDelete)}

            </div>
        </div>
    </section>
</main>`;

function renderButtons(item, onDelete) {
    if (sessionStorage.getItem('user') != null && JSON.parse(sessionStorage.getItem('user'))._id == item._ownerId) {
        return lp.html `<a href="/edit/${item._id}" class="button-list">Edit</a>
<a @click=${onDelete} href="javascript:void(0)" class="button-list">Delete</a>`
    }
    return '';
}
export async function pageDetails(ctx) {
    const itemId = ctx.params.id;
    const item = await api.data.getListById(itemId)
    console.log(item)
    ctx.render(tempDetail(item, onDelete));

    async function onDelete() {
        console.log(await api.data.deleteList(itemId));
        //TODO check redirect
        lp.page.redirect('/catalog')
    }
}