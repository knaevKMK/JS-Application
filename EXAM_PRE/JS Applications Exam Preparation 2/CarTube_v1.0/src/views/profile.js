import { api, lp } from '../lib.js';

//this user data include all items create by itself
const tempProfile = (lists) => lp.html `<main id="site-content">
    <section id="my-listings">
        <h1>My car listings</h1>
        <div class="listings">
            ${renderData(lists)}
        </div>
    </section>
</main>`;

function renderData(data) {
    console.log(data);
    if (data.length == 0) {
        return lp.html `<p class="no-cars"> You haven't listed any cars yet.</p>`;
    }
    return data.map(m => lp.html `<div class="listing">
    <div class="preview">
        <img src="${m.imageUrl}">
    </div>
    <h2>${m.brand} ${m.model}</h2>
    <div class="info">
        <div class="data-info">
            <h3>Year: ${m.year}</h3>
            <h3>Price: ${m.price} $</h3>
        </div>
        <div class="data-buttons">
            <a href="/details/${m._id}" class="button-carDetails">Details</a>
        </div>
    </div>
</div>`);
}

export async function pageProfile(ctx) {
    const myId = JSON.parse(sessionStorage.getItem('user'))._id
    console.log(myId)

    const lists = await api.data.getMyList(myId);
    ctx.render(tempProfile(lists));
}