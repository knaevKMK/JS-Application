import { lp, api } from "../../lib.js";

const tempHeader = (email, onLogout) => lp.html `
<header class="clearfix" id="profile">
    <div id="cashier">
        <span>Cashier: </span>
        <a href="#">Pesho</a>
    </div>
    <nav id="nav">
        <ul>
            <li>
                <a href="">Editor</a>
            </li>
            <li>
                <a href="">Overview</a>
            </li>
            <li>
                <a @click=${onLogout} href="javascript:void(0)" class="logout">Logout</a>
            </li>
        </ul>
    </nav>
</header>
`;

export function loadHeader() {
    const email = sessionStorage.getItem('email');


    async function onLogout() {
        await api.data.logout();
        lp.page.redirect('/');
    }


    return tempHeader(email, onLogout);
}