import { _user } from '../api/utility.js';
import { lp, api } from '../lib.js';


//TODO add item proto & attach click for delete item
const tempDetail = (item, onDelete) => lp.html`
<section id="details-page" class="content details">
    <h1>${item.title}</h1>

    <div class="details-content">
        <strong>Published in category ${item.category}</strong>
        <p>${item.content}</p>

        <div class="buttons">
            ${_user.getUserData() && _user.getUserData()._id==item._ownerId
        ? lp.html` <a @click=${onDelete} href="javascript:void(0)" class="btn delete">Delete</a>
            <a href="/edit/${item._id}" class="btn edit">Edit</a>`
            : ''}

            <a href="/" class="btn edit">Back</a>
        </div>
    </div>
</section>`;

export async function pageDetails(ctx) {
    const itemId = ctx.params.id;
    const item = await api.data.getItemById(itemId)
    ctx.render(tempDetail(item, onDelete));

    async function onDelete() {
        await api.data.deleteItem(itemId)
        lp.page.redirect('')
    }
}