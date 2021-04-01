import { _user } from '../api/utility.js';
import { lp, api } from '../lib.js';
import { note, temp } from './elements/note.js';
// also as ALL _ ITEMS
const tempCatalog = (data, onDelete) => lp.html `
<section id="viewCatalog">
    <div class="posts">
        ${renderData(data, onDelete)}
    </div>
</section>
`;

export function renderData(data, onDelete) {
    console.log(data);
    if (data.length == 0) {
        return lp.html `<h2>No posts in database</h2>`;
    }
    let c = 1;
    return Object.keys(data).map(m => lp.html `
    <article class="post">
        <div class="col rank">
            <span>${c++}</span>
        </div>
        <div class="col thumbnail">
            <a href="/details/${data[m]._id}">
                <img src="${data[m].imageUrl}">
            </a>
        </div>
        <div class="post-content">
            <div class="title">
                <a href="/details/${data[m]._id}">
                    ${data[m].title}
                </a>
            </div>
            <div class="details">
                <div class="info">
                    submitted ${calcTime(data[m]._createdOn)} ago by ${data[m].author}
                </div>
                <div class="controls">
                    <ul>
                        <li class="action"><a class="commentsLink" href="/details/${data[m]._id}">comments</a></li>
                        ${data[m]._ownerId == _user.getUserData()._id
            ? lp.html`<li class="action"><a class="editLink" href="/edit/${data[m]._id}">edit</a></li>
                        <li class="action"><a @click=${onDelete} id="${data[m]._id}" class="deleteLink"
                                href="javascript:void(0)">delete</a>
                        </li>`
            : ''
        }
    
                    </ul>
                </div>
    
            </div>
        </div>
    </article>`);
}
//
export function calcTime(dateIsoFormat) {
    let diff = new Date - (new Date(dateIsoFormat));
    diff = Math.floor(diff / 60000);
    if (diff < 1) return 'less than a minute';
    if (diff < 60) return diff + ' minute' + pluralize(diff);
    diff = Math.floor(diff / 60);
    if (diff < 24) return diff + ' hour' + pluralize(diff);
    diff = Math.floor(diff / 24);
    if (diff < 30) return diff + ' day' + pluralize(diff);
    diff = Math.floor(diff / 30);
    if (diff < 12) return diff + ' month' + pluralize(diff);
    diff = Math.floor(diff / 12);
    return diff + ' year' + pluralize(diff);

    function pluralize(value) {
        if (value !== 1) return 's';
        else return '';
    }
}

export async function pageCatalog(ctx) {
    const data = await api.data.getAllItems();
    ctx.render(tempCatalog(data, onDelete));

    async function onDelete() {
        const itemId = event.target.id;
        console.log(itemId)
        await api.data.deleteItem(itemId)
        note(temp.info('Post deleted.'))
        lp.page.redirect('/catalog')
    }
}