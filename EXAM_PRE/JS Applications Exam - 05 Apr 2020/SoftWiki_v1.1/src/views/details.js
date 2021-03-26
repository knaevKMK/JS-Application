import { html, page, getArticleById, deleteArticle } from '../library/import.js'

const tempDetails = (onDelete, art) => html `<div class="container details">
    <div class="details-content">
        <h2>${art.title}</h2>
        <strong>${art.category}</strong>
        <p>${art.content}</p>
        <div class="buttons">
            ${sessionStorage.getItem('email')
            ? html` <a @click=${onDelete} href="" class="btn delete">Delete</a>
            <a href="/edit/${art._id}" class="btn edit">Edit</a>`
                : html` <a href="/" class="btn edit">Back</a>`}
        </div>
    </div>
</div>`;

export async function loadDetails(ctx) {
    const artId = ctx.params.id;
    let art={};
    try{
        art = await getArticleById(artId);
      console.log(art)

    }catch(err){console.log(err.message);}
    ctx.render(tempDetails(onDelete, art));

    async function onDelete(){
        try{
            await deleteArticle(artId);
            page.redirect('/');
        }catch(err){console.log(err.message);}
    }
}