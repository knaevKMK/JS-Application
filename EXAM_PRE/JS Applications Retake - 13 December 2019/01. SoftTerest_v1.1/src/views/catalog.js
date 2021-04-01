import { lp, api } from '../lib.js';
// also as ALL _ ITEMS
const tempCatalog = (data) => lp.html `
<div id="dashboard-holder">
    ${renderData(data)}
</div>
`;

function renderData(data) {
    console.log(data);
    if (data.length == 0) {
        return lp.html `<h1>No ideas yet! Be the first one :)</h1>`;
    }
    return data
        .sort((a, b) => b.likes - a.likes)
        .map(m => lp.html `
    <div class="card overflow-hidden current-card details" style="width: 20rem; height: 18rem;">
        <div class="card-body">
            <p class="card-text">${m.name}</p>
        </div>
        <img class="card-image" src="${m.img}" alt="Card image cap">
        <a class="btn" href="/details/${m._id}">Details</a>
    </div>`);
}
export async function pageCatalog(ctx) {
    const data = await api.data.getAllItems();
    ctx.render(tempCatalog(data));
}