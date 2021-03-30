import { lp, api } from '../lib.js';

const tempCatalog = (data) => lp.html `<main id="site-content">
    <section id="car-listings">
        <h1>Car Listings</h1>
        <div class="listings">

            <!-- Display all records -->
            ${renderData(data)}


        </div>
    </section>
</main>
`;

function renderData(data) {
    console.log(data);
    if (data.length == 0) {
        return lp.html `<!-- Display if there are no records -->
<p class="no-cars">No cars in database.</p>`;
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
export async function pageCatalog(ctx) {
    const data = await api.data.getAllListings();
    ctx.render(tempCatalog(data));
}