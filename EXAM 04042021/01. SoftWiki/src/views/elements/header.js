import { _user } from "../../api/utility.js";
import { lp, api } from "../../lib.js";



const tempHeader = (user, onLogout) => lp.html`
<header>
    <h1><a class="home" href="/">SoftWiki</a></h1>
    <nav class="nav-buttons">
        <a href="/catalog">Catalogue</a>
        <a href="/search">Search</a>
        ${user
        ? lp.html` <div id="user">
            <a href="/create">Create</a>
            <a @click=${onLogout} href="javascript:void(0)">Logout</a>
        </div>`
            : lp.html` <div id="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
        </div>`}


    </nav>
</header>`;



export function loadHeader() {
    const user = _user.getUserData();

    async function onLogout() {
        await api.data.logout();
         lp.page.redirect('/');
    }

    return tempHeader(user, onLogout);
}