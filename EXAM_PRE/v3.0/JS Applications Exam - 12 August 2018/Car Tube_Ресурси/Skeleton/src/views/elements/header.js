import { lp, api } from "../../lib.js";
import { note, temp } from "./note.js";

const tempHeader = (email, onLogout) => lp.html `
<nav>
    <a class="active" href="/">Home</a>
    ${email != null
    ? lp.html` <a href="/catalog">All Listings</a>
    <a href="/profile">My Listings</a>
    <a href="/create">Create Listing</a>
    <div id="profile">
        <a>Welcome ${email}</a>
        <a @click=${onLogout} href="javascript:void(0)">logout</a>
    </div>`
    : lp.html``
    }

</nav>`;

export function loadHeader() {
    const email = sessionStorage.getItem('email');

    async function onLogout() {
        note(temp.loading());
        await api.data.logout();
        note(temp.info("Logout successful"));
        lp.page.redirect('/');
    }


    return tempHeader(email, onLogout);
}