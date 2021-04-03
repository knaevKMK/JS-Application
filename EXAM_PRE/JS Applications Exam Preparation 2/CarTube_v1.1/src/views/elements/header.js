import { _user } from "../../api/utility.js";
import { lp, api } from "../../lib.js";


// Some elements will visible if(user!=undefined)
// user will undefined or parse JSON object (what server response=> look pint utility r11)
const tempHeader = (user, onLogout) => lp.html`<header>
    <nav>
        <a class="active" href="/">Home</a>
        <a href="/catalog">All Listings</a>
        <a href="search">By Year</a>

        ${user
            ? lp.html`
        <!-- Logged users -->
        <div id="profile">
            <a>Welcome ${user.username}</a>
            <a href="profile">My Listings</a>
            <a href="create">Create Listing</a>
            <a @click=${onLogout} href="javascript:void(0)">Logout</a>
        </div>`
                : lp.html`
        <!-- Guest users -->
        <div id="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
        </div>`}
    </nav>
</header>`;






export function loadHeader() {
    const user = _user.getUserData();

    async function onLogout() {
        await api.data.logout();
        //where to re-direct?
        lp.page.redirect('/');
    }

    return tempHeader(user, onLogout);
}