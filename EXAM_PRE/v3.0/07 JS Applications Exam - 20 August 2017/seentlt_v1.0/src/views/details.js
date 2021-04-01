import { _user } from '../api/utility.js';
import { lp, api } from '../lib.js';
import { calcTime } from './catalog.js';
import { note, temp } from './elements/note.js';


//TODO add item proto & attach click for delete item
const tempDetail = (item, onDelete, comments, delCom, createComment) => lp.html `
<section id="viewComments">
    <div class="post">
        <div class="col thumbnail">
            <a href="/details/${item._id}">
                <img src="${item.imageUrl}">
            </a>
        </div>
        <div class="post-content">
            <div class="title">
                <a href="/details/${item._id}">
                    ${item.title}
                </a>
            </div>
            <div class="details">
                <p> ${item.description}</p>
                <div class="info">
                    submitted ${calcTime(item._createdOn)} ago by pesho
                </div>
                <div class="controls">
                    <ul>
                        ${_user.getUserData()._id == item._ownerId
                        ? lp.html` <li class="action"><a class="editLink" href="/edit/${item._id}">edit</a></li>
                        <li class="action"><a @click=${onDelete} class="deleteLink" href="javascript:void(0)">delete</a>
                        </li>`
                    : ''}

                    </ul>
                </div>

            </div>
        </div>
        <div class="clear"></div>
    </div>
    <div class="post post-content">
        <form @submit=${createComment}id="commentForm">
            <label>Comment</label>
            <textarea name="content" type="text"></textarea>
            <input type="submit" value="Add Comment" id="btnPostComment">
        </form>
    </div>
    ${renderComments(comments, item._id, delCom)}


</section>`;




function renderComments(data, id, delCom) {
    console.log(data);
    if (data.length == 0) {
        return lp.html`<h2>No comments in this post</h2>`;
    }
    let c = 1;
    return Object.keys(data)
        //.filter(c => data[c].postId == id)
        .map(c => lp.html`
    <article class="post post-content">
        <p>${data[c].content}</p>
        <div class="info">
            submitted 3 days ago by ${data[c].author} | <a id="${data[c]._id}" @click=${delCom} href="javascript:void(0)"
                class="deleteLink">delete</a>
        </div>
    </article>`)
}


export async function pageDetails(ctx) {
    const itemId = ctx.params.id;
    const item = await api.data.getItemById(itemId)
    const comments = await api.data.getAllComments();
    ctx.render(tempDetail(item, onDelete, comments, delCom, createComment));

    async function onDelete() {
        console.log(itemId)
        await api.data.deleteItem(itemId)
        note(temp.info('Post deleted.'))
        //TODO check redirect
        lp.page.redirect('/catalog')
    }

    async function delCom() {
        const commId = event.target.id;
        console.log(commId)
        console.log(await api.data.delComm(commId));
        note(temp.info('Post deleted.'));
        //TODO check redirect
        lp.page.redirect('/details/' + itemId)
    }
    async function createComment() {
        event.preventDefault();
        const fd = api.data.getFormData(event.target);
        console.log(fd);
        if (fd.content.trim() == '') {
            return note(temp.err('Field description required'));
        }
        fd.content = fd.content.trim();
        fd.postId = itemId;
        fd.author = _user.getUserData().email;
        console.log(await api.data.createComment(fd))
        note(temp.info('Successful comment this post'))
    }
}