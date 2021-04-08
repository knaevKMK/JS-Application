import { _user } from "../../api/utility.js";
import { lp, api } from "../../lib.js";


// Some elements will visible if(user!=undefined)
// user will undefined or parse JSON object (what server response=> look pint utility r11)
const tempHeader = (user, onLogout) => lp.html `<header>
<nav>
    <ul>
        ${user
        ?lp.html` <li>
            <a href="/create">Create new offer</a>
        </li> `
        :lp.html` <li class="site-logo">Shoe</li>`}
            
        <li>
            <a href="/">
                <img src="../public/sneakers.png" alt="">
            </a>
        </li> 
        ${user
        ?lp.html`<li>Welcome, ${user.email} | 
            <a @click=${onLogout} href="javascript:void(0)">Logout</a>
        </li>`
        :lp.html` <li class="site-logo">Shelf</li> `}

    </ul>
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