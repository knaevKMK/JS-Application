import { lp, api } from "../../lib.js";

const tempHeader = (email, onLogout) => lp.html `
<nav> <a href="/catalog">All Memes</a>
    ${email != null
          // Logged users
            ? lp.html` <div class="user">
        <a href="/create">Create Meme</a>
        <div class="profile">
            <span>Welcome, ${email}</span>
            <a href="/profile">My Profile</a>
            <a @click=${onLogout} href="javascript:void(0)">Logout</a>
        </div>
    </div>`
           //Guest users
            : lp.html` <div class="guest">
        <div class="profile">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
        </div>
        <a class="active" href="/">Home Page</a>
    </div>`}
</nav>
     <section id="notifications"></section>`;

export function loadHeader() {
    const email = sessionStorage.getItem('email');


    async function onLogout() {
        await api.data.logout();
        lp.page.redirect('/');
    }


    return tempHeader(email, onLogout);
}