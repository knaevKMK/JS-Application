import { _user } from '../api/utility.js';
import { lp, api } from '../lib.js';


//TODO add item proto & attach click for delete item
const tempDetail = (item, onDelete,onBuy) => lp.html`<div class="offer-details">
    <h1>${item.brand} ${item.name}</h1>
    <div class="info">
        <img src="${item.img}" alt="">
        <div class="description">${item.description}
            <br>
            <p class="price">Buyers: ${item.bought}</p>
            <br>
            <p class="price">$${item.price}</p>
        </div>
    </div>

    <div class="actions">
        ${renderBtns(item,onDelete,onBuy)}
    </div>
</div>`;
function renderBtns(item,onDelete,onBuy) {
   
    if (_user.getUserData()._id == item._creatorId) {
        return lp.html`  
        <a href="/edit/${item._id}">Edit</a>
        <a @click=${onDelete}>Delete</a>`;
    }
    return lp.html` 
    <a @click=${onBuy}">Buy</a>
    <span></span>`;
}
export async function pageDetails(ctx) {
    const itemId = ctx.params.id;
    const item = await api.data.getItemById(itemId)
    console.log(item)
    ctx.render(tempDetail(item, onDelete,onBuy));


    async function  onBuy() {
        const span=event.target.parentNode.children[1];
        span.textContent="You bought it";
        item.bought++;
        await api.data.updateItem(itemId,item);

        lp.page.redirect('/details/'+itemId);
    }
    async function onDelete() {
        await api.data.deleteItem(itemId)
        lp.page.redirect('/')
    }
}