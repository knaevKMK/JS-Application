import { html, page, logout } from '../../library/import.js';


const tempHeader = (logged, logout) => html `<header>
    <h1><a class="home" href="/">SoftWiki</a></h1>
    <nav class="nav-buttons">
        ${logged
        ? html`<a href="/create">Create</a>
        <a @click=${logout} href="">Logout</a>`
            : html`
        <a href="/register">Register</a>`}
    </nav>
</header>`;

export function loadHeader() {
    const logged = sessionStorage.getItem('email') != null
    return tempHeader(logged, log_out);
}

async function log_out() {
try{
    await logout();
    page.redirect('/')
}catch(err){}
}