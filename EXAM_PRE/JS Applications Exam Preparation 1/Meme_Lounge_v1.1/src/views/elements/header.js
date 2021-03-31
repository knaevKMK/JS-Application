import { _user } from "../../api/utility.js";
import { lp, api } from "../../lib.js";


// Some elements will visible if(user!=undefined)
// user will undefined or parse JSON object (what server response=> look pint utility r11)
const tempHeader = (user, onLogout) => lp.html `
  <section id="notifications">
        </section>
        <nav>
            <a href="/catalog">All Memes</a>
            ${user
            ?lp.html`
             <!-- Logged users --> <div class="user">
                <a href="/create">Create Meme</a>
                <div class="profile">
                    <span>Welcome, ${user.username}</span>
                    <a href="/profile">My Profile</a>
                    <a @click=${onLogout}href="javascript:void(0)">Logout</a>
                </div>
            </div>`
            :lp.html`  <!-- Guest users -->
             <div class="guest">
                <div class="profile">
                    <a href="/login">Login</a>
                    <a href="/register">Register</a>
                </div>
                <a class="active" href="/">Home Page</a>
            </div>`
            }
        </nav>
        `;


export function loadHeader() {
    const user = _user.getUserData();

    async function onLogout() {
        await api.data.logout();
        //where to re-direct?
        lp.page.redirect('/');
    }

    return tempHeader(user, onLogout);
}