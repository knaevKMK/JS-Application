import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { getFormData, getIdeaById, deleteIdea } from "../api/data.js";
import { loadSuccess, loadError } from "./elements/modal.js";
import page from '../../node_modules/page/page.mjs';

const tempDetails = (onDelete, onComment, idea) => html `
<div class="container home some">
    <img class="det-img" src="${idea.img}" />
    <div class="desc">
        <h2 class="display-5">${idea.name}</h2>
        <p class="infoType">Description:</p>
        <p class="idea-description">${idea.description}
        </p>
        <p class="infoType">Likes:
            <large>${idea.likes}</large>
        </p>
        <p class="infoType">Comments:</p>
        <ul>
            ${renderComments(idea.comments)}
        </ul>
    </div>
    ${sessionStorage.getItem('email') == idea.creator
            ? html` <div class="text-center">
        <a @click=${onDelete} id="delete" class="btn detb" href="javascript:void(0)">Delete</a>
    </div>`
            : html`<form @submit=${onComment} class="text-center" method="" action="">
        <textarea class="textarea-det" name="newComment" id=""></textarea>
        <button type="submit" class="btn detb">Comment</button>
        <a id="like" class="btn detb" href="javascript:void(0)">Like</a>
    </form>`}
</div>`;


function renderComments(comments) {
    //   const _comments = JSON.parse(comments)
    if (comments.length == 0) {
        return html`<li class="comment">No comments yet :(</li>`;
    }
    return comments.map(com => html`<li class="comment">${com.owner}: ${com.text}</li>`);
}
export async function loadDetails(ctx) {
    console.log('Details');
    const ideaId = ctx.params.id;
    const data = await getIdeaById(ideaId);
    ctx.render(tempDetails(onDelete,onComment, data));

    async function onComment() {
        event.preventDefault();
        console.log('Comment');
        const fd = getFormData(event.target);
        console.log(fd);
        //TODO send comment and reload page

    }
    async function onDelete(){
        console.log('delete')
        try{
            console.log(ideaId)
            const response= await deleteIdea(ideaId);
            console.log(response);
            ctx.render(loadSuccess('Idea deleted successfully.'));
            setTimeout(() => {
               page.redirect('/');
            }, 1000);
        }catch(err){
            console.log(err)
            ctx.render(loadError('Something went wrong!'));
            setTimeout(() => {
                ctx.render(tempDetails(onDelete,onComment, data));
            }, 1000);

        }
    }
}