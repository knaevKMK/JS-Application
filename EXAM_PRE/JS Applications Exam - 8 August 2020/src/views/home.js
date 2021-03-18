import { html } from "../../node_modules/lit-html/lit-html.js";
import { getMovies } from '../api/data.js'
import page from '../../node_modules/page/page.mjs';

const homeTemp = (films, onsubmit) => html `
<div class="jumbotron jumbotron-fluid text-light" style="background-color: #343a40;">
<img src="https://s.studiobinder.com/wp-content/uploads/2019/06/Best-M-Night-Shyamalan-Movies-and-Directing-Style-StudioBinder.jpg" class="img-fluid" alt="Responsive image">
<h1 class="display-4">Movies</h1>
<p class="lead">Unlimited movies, TV shows, and more. Watch anywhere. Cancel anytime.</p>
</div>
${sessionStorage.getItem('email') == null
        ? ''
        : html`
<h1 class="text-center">Movies</h1>
<section>
<a href="/create" class="btn btn-warning ">Add Movie</a>
<form @submit =${onsubmit} class="search float-right">
    <label>Search: </label>
    <input type="text">
    <input type="submit" class="btn btn-info" value="Search">
</form>
</section>

<div class=" mt-3 ">
    <div class="row d-flex d-wrap">
        <div class="card-deck d-flex justify-content-center">
${films.length == 0
                ? html`<h3>No movies...</h3> `
                : films.map(item => html`<div class="card mb-4">
                <img class="card-img-top" src=${item.img} alt="Card image cap" width="400">
                <div class="card-body">
                    <h4 class="card-title">${item.title}</h4>
                </div>
                <div class="card-footer">
                    <a href="/details/${item._id}"><button type="button" class="btn btn-info">Details</button></a>
                </div>
            </div>`)
            }
        </div >
    </div >
</div > `
    }
`;


export async function loadHome(ctx,) {
    console.log("on home")
    const films = await getMovies();
    console.log(films);
    ctx.render(homeTemp(films, onsubmit));


    async function onsubmit() {
        event.preventDefault();
        const text = document.querySelector('form').children[1].value.trim();
        page.redirect(`/search/${text}`)

    }
}