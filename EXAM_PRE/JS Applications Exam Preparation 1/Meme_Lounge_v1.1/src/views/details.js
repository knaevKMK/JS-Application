import { _user } from '../api/utility.js';
import { lp, api } from '../lib.js';


//TODO add item proto & attach click for delete item
const tempDetail = (item, onDelete) => lp.html `<main>
    <section id="meme-details">
        <h1>Meme Title: ${item.title}

        </h1>
        <div class="meme-details">
            <div class="meme-img">
                <img alt="meme-alt" src="${item.imageUrl}">
            </div>
            <div class="meme-description">
                <h2>Meme Description</h2>
                <p>
                    ${item.description}
                </p>
                <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
                ${renderButtons(item, onDelete)}
            </div>
        </div>
    </section>
</main>`;

function renderButtons(item, onDelete) {
    if (_user.getUserData() && _user.getUserData()._id == item._ownerId) {
        return lp.html `<a class="button warning" href="/edit/${item._id}">Edit</a>
<button @click=${onDelete} class="button danger">Delete</button>`;
    }

}
export async function pageDetails(ctx) {
    const itemId = ctx.params.id;
    const item = await api.data.getItemById(itemId)
    ctx.render(tempDetail(item, onDelete));

    async function onDelete() {
        await api.data.deleteItem(itemId)

        lp.page.redirect('')
    }
}