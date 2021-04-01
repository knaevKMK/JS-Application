import { lp, api } from "../../lib.js";

const tempHeader = (user, onLogout) => lp.html `
<header>
    <nav>
        <a class="active" href="/">Home</a>
        <a href="/catalog">All Listings</a>
        <a href="/search">By Year</a>
        <!-- Guest users -->
        ${user == null
        ? lp.html`<div id="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
        </div>`
        : lp.html` <div id="profile">
            <a>Welcome ${user.username}</a>
            <a href="/profile">My Listings</a>
            <a href="/create">Create Listing</a>
            <a @click=${onLogout} href="javascript:void(0)">Logout</a>
        </div>`}

        <!-- Logged users -->

    </nav>
</header>`;

export function loadHeader() {
    const user = JSON.parse(sessionStorage.getItem('user'));


    async function onLogout() {
        await api.data.logout();
        lp.page.redirect('/');
    }


    return tempHeader(user, onLogout);
}