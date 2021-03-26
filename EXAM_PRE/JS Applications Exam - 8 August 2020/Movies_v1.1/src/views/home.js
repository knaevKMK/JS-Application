import { getAllMovies, getSearch } from '../api/data.js';
import { getFormData, html } from '../lib.js';
import { loadErr } from './elements/note.js';

const tempHome = (onSubmit, data) => html`<div class="jumbotron jumbotron-fluid text-light" style="background-color: #343a40;">
    <img src="https://s.studiobinder.com/wp-content/uploads/2019/06/Best-M-Night-Shyamalan-Movies-and-Directing-Style-StudioBinder.jpg"
        class="img-fluid" alt="Responsive image">
    <h1 class="display-4">Movies</h1>
    <p class="lead">Unlimited movies, TV shows, and more. Watch anywhere. Cancel anytime.</p>
</div>
${sessionStorage.getItem('email') == null
        ? ''
        : html`<h1 class="text-center">Movies</h1>
<section>
    <a href="/add_movie" class="btn btn-warning ">Add Movie</a>
    <form @submit=${onSubmit} class="search float-right">
        <label>Search: </label>
        <input type="text">
        <input type="submit" class="btn btn-info" value="Search">
    </form>
</section>
<div class=" mt-3 ">
    <div class="row d-flex d-wrap">

        <div class="card-deck d-flex justify-content-center">
            ${renderMovies(data)}

        </div>
    </div>`}
`;

function renderMovies(data) {
    if (data.length == 0) {
        return html`<h2>No movies...</h2>`;
    }

    return data
        .map(m => html`<div class="card mb-4">
    <img class="card-img-top" src="${m.img}" alt="Card image cap" width="400">
    <div class="card-body">
        <h4 class="card-title">${m.title}</h4>
    </div>
    <div class="card-footer">
        <a href="/details/${m._id}"><button type="button" class="btn btn-info">Details</button></a>
    </div>

</div>`);
}


export async function loadHome(ctx) {
    const data = await getAllMovies();
    console.log(data);
    ctx.render(tempHome(onSubmit, data));

    async function onSubmit() {
        event.preventDefault();
        const fd = document.querySelector('form').children[1].value.trim();
        console.log(fd);
        if (fd == '') {
            loadErr('Search field is empty');
            return;
        }
        try {
            const data = await getSearch(fd);
            console.log(data);
            ctx.render(getResult(data));
        } catch (err) {
            loadErr(err.message);
        }
    }
}

function getResult(data){
    if (data.length==0){
        return html`No matches...`
    }
    return html`<ul>${data.map(m=>html`<li> <a href="/details/${data.Id}">${data.title} <img src="${data.img}"></a></li>`)}</ul>`
}