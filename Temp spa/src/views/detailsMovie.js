import { html } from "../../node_modules/lit-html/lit-html.js";
import { getCommentsByRecipeId, getMovieById } from "../api/data.js";


const detailsTemp = (item, btn) => html ` <div class="container">
<div class="row bg-light text-dark">
    <h1>Movie title: ${item.title}</h1>
    <div class="col-md-8">
        <img class="img-thumbnail" src=${item.img} alt="Movie">
    </div>
    <div class="col-md-4 text-center">
        <h3 class="my-3 ">Movie Description</h3>
        <p>${item.description}</p>
        ${btn}
        </div >
</div >
</div > `

export async function loadDetails(ctx) {
    const itemId = (ctx.params.id);
    let btn;
    const response = await getMovieById(itemId);
    if (sessionStorage.getItem('id') == response._ownerId) {
        btn = html `<a class="btn btn-danger" href="/delete/${response._id}">Delete</a>
    <a class="btn btn-warning" href="/edit/${response._id}">Edit</a>`;
    } else {
        const comments = await getCommentsByRecipeId(itemId)
            // console.log(comments);
        btn = comments.find(comment => comment._ownerId == sessionStorage.getItem('id')) == undefined ?
            html `<a class="btn btn-primary" href="/like/${response._id}">Like</a>` :
            html `<span class="enrolled-span" >Liked ${comments.length}</span>`;

    }

    ctx.render(detailsTemp(response, btn));
}