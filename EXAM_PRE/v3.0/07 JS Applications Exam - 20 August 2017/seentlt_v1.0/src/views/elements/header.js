import { _user } from "../../api/utility.js";
import { lp, api } from "../../lib.js";
import { note, temp } from "./note.js";


// Some elements will visible if(user!=undefined)
// user will undefined or parse JSON object (what server response=> look pint utility r11)
const tempHeader = (user, onLogout) => lp.html `
<header>
    <span class="logo">☃</span><span class="header">SeenIt</span>
    ${user
        ? lp.html`<div @click=${onLogout} id="profile"><span>${user.email}</span>|<a href="javascript:void(0)">logout</a>
    </div>` : ''}

</header>

`;


const navBar = (logged) => lp.html`${logged
 ? lp.html`<div id="menu">
    <div class="title">Navigation</div>
    <a class="nav" href="/catalog">Catalog</a>
    <a class="nav" href="/create">Submit Link</a>
    <a class="nav" href="/profile">My Posts</a>
</div>`: ''}`;

export function loadNavBar() {
    const logged = _user.getUserData();
    return navBar(logged);
}

export function loadHeader() {
    const user = _user.getUserData();

    async function onLogout() {
        api.data.logout();
        note(temp.info('Logout successful.'))
        lp.page.redirect('/');
    }

    return tempHeader(user, onLogout);
}