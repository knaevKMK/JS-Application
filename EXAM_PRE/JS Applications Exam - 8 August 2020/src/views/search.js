import { html } from "../../node_modules/lit-html/lit-html.js";
import { getMovies } from "../api/data.js";
import page from '../../node_modules/page/page.mjs';

const tempLoading = () => html `
        <div class="notifications" style="display: inline-block;background-color:rgba(1, 131, 29, 0.541);">
            <h3 class="notification-message" id="successBox">Loading...</h3>
        </div>`;



const tempSearch = (films) => html `<div class=" mt-3 ">
<div class="row d-flex d-wrap">
    <div class="card-deck d-flex justify-content-center">
    <ul>
${films.length == 0
        ? html` <h3 id="errorBox">No movies found</h3>`
        : films.map(item => html`<li class="card mb-4">
            <div class="card-footer">
                <a href="/details/${item._id}"> <h4 class="card-title">${item.title}</h4>
                <img class="card-img-top" src=${item.img} alt="Card image cap" width="40">
                </a>
            </div>
        </li>`)
    }
        </ul>
    </div >
</div >
</div > `;

export async function loadSearch(ctx) {
    let regex = ctx.params.id
    console.log(regex);
    const allMovies = await getMovies();

    let result = allMovies
        .filter(m => {
            return m.description.includes(regex) || m.title.includes(regex);
        });
    console.log(result)
    ctx.render(tempLoading());


    setTimeout(() => {
        ctx.render(tempSearch(result));
    }, 1000);
}