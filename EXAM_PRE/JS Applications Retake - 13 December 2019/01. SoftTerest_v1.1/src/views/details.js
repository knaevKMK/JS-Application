import { _user } from '../api/utility.js';
import { lp, api } from '../lib.js';
import { note, temp } from './elements/note.js';


//TODO add item proto & attach click for delete item
const tempDetail = (item, onDelete, onComment, onLike) => lp.html `
<div class="container home some">
    <img class="det-img" src="${item.img}" />
    <div class="desc">
        <h2 class="display-5">${item.name}</h2>
        <p class="infoType">Description:</p>
        <p class="idea-description">${item.description}
        </p>
        <p class="infoType">Likes:
            <large>${item.likes}</large>
        </p>
        <p class="infoType">Comments:</p>
        <ul>
            ${renderComments(item.comments)}
        </ul>
    </div>

    ${_user.getUserData().username == item.creator
    ? lp.html` <div class="text-center">
        <a @click=${onDelete} class="btn detb" href="javascript:void(0)">Delete</a>
    </div>`
: lp.html` <form class="text-center" method="" action="">
        <textarea class="textarea-det" name="newComment" id=""></textarea>
        <button @click=${onComment} type="submit" class="btn detb">Comment</button>
        <a @click=${onLike} class="btn detb" href="javascript:void(0)">Like</a>
    </form>`}


    <!-- TODO comment -->

</div>`;

function renderComments(com) {
    console.log(com);
    if (com.length == 0) {
        return lp.html`<li class="comment">No comments yet :(</li>`;
    }
    return com
        .map(c => lp.html`<li class="comment">${c.owner}: ${c.text}</li>`)
}

export async function pageDetails(ctx) {
    const itemId = ctx.params.id;
    const item = await api.data.getItemById(itemId)
    ctx.render(tempDetail(item, onDelete, onComment, onLike));

    async function onLike() {
        item.likes++;
        await api.data.updateItem(itemId, item);
        note(temp.info('Like'))
        lp.page.redirect('/details/' + itemId);
    }
    async function onComment() {
        event.preventDefault();
        const btn = event.target;
        const text = btn.parentNode.children[0].value.trim();
        const owner = _user.getUserData().username;
        item.comments.push({ "owner": owner, "text": text });
        await api.data.updateItem(itemId, item);
        btn.parentNode.children[0].value = '';
        note(temp.info('I`ve comment this idea'))
        lp.page.redirect('/details/' + itemId);
    }

    async function onDelete() {
        await api.data.deleteItem(itemId)
        note(temp.info('Idea deleted successfully.'))
        //TODO check redirect
        lp.page.redirect('/dashboard')
    }
}