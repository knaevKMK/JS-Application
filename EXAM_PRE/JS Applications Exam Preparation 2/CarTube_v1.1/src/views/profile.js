import { _user } from '../api/utility.js';
import { api, lp } from '../lib.js';

//this user data include all items create by itself
const tempProfile = (data) => lp.html`
    <section id="my-listings">
        <h1>My car listings</h1>
        <div class="listings">
            ${renderData(data)}
            <!-- Display all records -->
    
    
    
        </div>
    </section>`;

function renderData(data) {
    console.log(data);
    if (data.length == 0) {
        return lp.html`<!-- Display if there are no records -->
<p class="no-cars"> You haven't listed any cars yet.</p>`;
    }


    return data.map(m => lp.html`<div class="listing">
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
    const user = _user.getUserData();
    const data =await api.data.getMyItems(user._id);
    ctx.render(tempProfile(data));
}