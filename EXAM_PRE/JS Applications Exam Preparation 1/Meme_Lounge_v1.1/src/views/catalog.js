import { lp, api } from '../lib.js';
// also as ALL _ ITEMS
const tempCatalog = (data) => lp.html `<main>
    <section id="meme-feed">
        <h1>All Memes</h1>
        <div id="memes">
            <!-- Display : All memes in database ( If any ) -->
            ${renderData(data)}

        </div>
    </section>
</main>
`;

function renderData(data) {
    console.log(data);
    if (data.length == 0) {
        return lp.html `<!-- Display : If there are no memes in database -->
<p class="no-memes">No memes in database.</p>`;
    }
    return data.map(m => lp.html `<div class="meme">
    <div class="card">
        <div class="info">
            <p class="meme-title">${m.title}</p>
            <img class="meme-image" alt="meme-img" src="${m.imageUrl}">
        </div>
        <div id="data-buttons">
            <a class="button" href="/details/${m._id}">Details</a>
        </div>
    </div>
</div>`);
}
export async function pageCatalog(ctx) {
    const data = await api.data.getAllItems();
    ctx.render(tempCatalog(data));
}