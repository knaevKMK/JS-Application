import { lp, api } from "../../lib.js";
import { note, temp } from "./note.js";

const tempHeader = (email, receipt, onLogout) => lp.html `
    ${email != null
        ? lp.html`<header class="clearfix" id="profile">
        <div id="cashier">
            <span>Cashier: </span>
            <a href="/catalog">${email}</a>
        </div>
        <nav id="nav">
            <ul>
                    ${receipt==null
                    ?lp.html`<li><a href="">Archive</a> </li>`
                    :lp.html` <li><a href="/edit/${receipt}">Editor</a> </li>`}
                <li>
                    <a href="/catalog">Overview</a>
                </li>
                <li>
                    <a @click=${onLogout} href="javascript:void(0)" class="logout">Logout</a>
                </li>
            </ul>
        </nav>
    </header>`
        : ''}
`;

export function loadHeader() {
    const email = sessionStorage.getItem('email');
    const receipt = sessionStorage.getItem('receipt');
    return tempHeader(email,receipt, onLogout);
}
async function onLogout() {
    console.log('logout')
    try {
        await api.data.logout();
        note(temp.info('Logout successful.'))

    } catch (err) {
        note(temp.err(err.message))
    }
    lp.page.redirect('/');
}