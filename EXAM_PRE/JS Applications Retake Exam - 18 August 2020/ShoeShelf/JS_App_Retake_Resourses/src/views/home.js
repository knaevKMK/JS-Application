import { html } from '../../node_modules/lit-html/lit-html.js';
import { getCatalog } from '../api/data.js'

const tempHome = (email, catalog) => html `<main>
    ${email
        ? html` <div class="shoes">
        ${catalog.length > 0
            ? catalog
            .sort((a, b) => b.bought - a.bought)
            .map(item => html`
        <div class="shoe">
            <img src=${item.img}>
            <h3>${item.brand} ${item.name}</h3>
            <a href="/details/${item._id}">Buy it for ${item.price} $</a>
        </div>`)
                : html`<h1>No shoes to display. Be the first to create a new offer...</h1>`}
    </div>`
            : html`<div class="container">
        <div class="about-us">
            <div>
                <img src="../public/shoes.jpg" alt="">
                <img src="../public/shoes2.jpg" alt="">
            </div>
            <p>
                <a href="/register">Register Now</a> and Try it!
            </p>
        </div>
    </div>`
    }

</main>`;

export async function loadHome(ctx) {
    let email = sessionStorage.getItem('email');
    let catalog = [];
    if (email) {
        catalog = await getCatalog();
        console.log(catalog);
    }

    ctx.render(tempHome(email, catalog));
}