import { _user } from '../api/utility.js';
import { api, lp } from '../lib.js';
import { renderData } from './catalog.js';

//this user data include all items create by itself
const tempProfile = (data) => lp.html `<section id="viewMyPosts">
    <div class="post post-content">
        <h1>Your Posts</h1>
    </div>
    <div class="posts">
        ${renderData(data)}
    </div>
</section>`;


export async function pageProfile(ctx) {
    const user = _user.getUserData()
        //TODO what want the exercise
    const data = await api.data.getMyItems(user._id);
    ctx.render(tempProfile(data));
    async function onDelete() {
        const itemId = event.target.id;
        console.log(itemId)
        await api.data.deleteItem(itemId)
        note(temp.info('Post deleted.'))
        lp.page.redirect('/catalog')
    }
}