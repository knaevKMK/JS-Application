import { lp, api } from "../../lib.js";

const tempHeader = (username, onLogout) => lp.html `
<header><span>Chirper</span></header>
${username != null ? lp.html`<div class="menu">
    <a href="/">Home</a>
    <a href="discover">Discover</a>
    <a href="/profile/${sessionStorage.getItem('id')}">Me</a>
    <a @click=${onLogout} href="javascript:void(0)">Logout</a>
</div>`
: ''}
`;

export function loadHeader() {
    const username = sessionStorage.getItem('username');


    async function onLogout() {
        await api.data.logout();
        lp.page.redirect('/register');
    }


    return tempHeader(username, onLogout);
}