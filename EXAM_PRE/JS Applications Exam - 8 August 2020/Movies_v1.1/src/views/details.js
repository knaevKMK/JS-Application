import { createLike, deleteMovie, getCommentsByRecipeId, getMovieById } from '../api/data.js';
import { loadSuccess, page, html, loadErr } from '../lib.js';

const tempDetails =async(data, onDelete, onLike) => html`<div class="container">
    <div class="row bg-light text-dark">
        <h1>Movie title: ${data.title}</h1>

        <div class="col-md-8">
            <img class="img-thumbnail" src="${data.img}" alt="Movie">
        </div>
        <div class="col-md-4 text-center">
            <h3 class="my-3 ">Movie Description</h3>
            <p>${data.description}</p>

            ${sessionStorage.getItem('id') == data._ownerId
        ? html` <a @click=${onDelete} class="btn btn-danger" href="">Delete</a>
            <a class="btn btn-warning" href="/edit/${data._id}">Edit</a>`

        : html`${await renderLike(onLike,data)}`
    }
           
        </div>
    </div>
</div>
`;
async function renderLike(onLike, data){
    const liked= await getCommentsByRecipeId(data._id);
    console.log(liked)
    if(liked.some(like=>like._ownerId==sessionStorage.getItem('id'))){
        return html `<span class="enrolled-span">Liked ${liked.length}</span>`;
    }else{
        return html` <a @click=${onLike} class="btn btn-primary" href="">Like</a>`
    };
    
   
}
export async function loadDetails(ctx) {
    const movieId = ctx.params.id;
    const data = await getMovieById(movieId)
    console.log(data)
    ctx.render(await tempDetails(data, onDelete, onLike));


    async function onDelete() {
        try {
            await deleteMovie(movieId);
            loadSuccess('Deleted successfully');
            page.redirect('/')
        } catch (err) {
            loadErr(err.message);
        }
    }
    async function onLike() {
        try {
           await createLike(movieId);
            loadSuccess('Liked');
                } catch (err) {
            loadErr(err.message);
        }
    }
}

