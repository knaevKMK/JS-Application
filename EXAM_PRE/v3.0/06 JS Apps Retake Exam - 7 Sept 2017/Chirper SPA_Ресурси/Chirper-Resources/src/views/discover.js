import { follow } from '../api/data.js';
import { lp, api } from '../lib.js';

const tempCatalog = (data) => lp.html `<section id="viewDiscover">
    <div class="content">
        <div class="chirps">
            <h2 class="titlebar">Discover</h2>
            <div id="userlist">

                ${renderData(data)}

            </div>
        </div>
    </div>
</section>
`;

function renderData(data) {
    console.log(data);
    if (data.length == 0) {
        return lp.html ``;
    }
    return data.map((m) => lp.html `
    <div class="userbox">
        <div><a href="/profile/${m._id}" class="chirp-author">${m.username}</a></div>
        <div class="user-details"><span>${m.subscriptions.length} followers</span></div>
    </div>`);
}



export async function pageCatalog(ctx) {
    const data = await api.data.getDiscover();

    console.log(data)
    ctx.render(tempCatalog(data));
}