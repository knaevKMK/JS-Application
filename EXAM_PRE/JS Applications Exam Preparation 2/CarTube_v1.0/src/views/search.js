import { api, lp } from "../lib.js";


const tempSearch = (onSearch) => lp.html `
<main id="site-content">
    <section id="search-cars">
        <h1>Filter by year</h1>

        <div class="container">
            <input type="text" id="search-input" name="search" placeholder="Enter desired production year">
            <button @click=${onSearch}class="button-list">Search</button>
        </div>
        <h2>Results:</h2>
        <div class="listings">
        </div>

    </section>
</main>`;

function renderData(data) {
    console.log(data);
    if (data.length == 0) {
        return lp.html `<!-- Display if there are no records -->
<p class="no-cars"> No results.</p>`;
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
export async function pageSearch(ctx) {
    ctx.render(tempSearch(onSearch));


    async function onSearch() {
        const query = Number(document.querySelector('.container').children[0].value);
        console.log(query);
        try {
            const data = await api.data.search(query);
            console.log(data)
            const result = document.querySelector('.listings')
            lp.render(lp.html `
                <!-- Display all records -->
                ${renderData(data)}
                <!-- Display if there are no matches -->
                </div>`, result)
        } catch (err) {

        }

    }
}