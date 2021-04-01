import { _user } from "../../api/utility.js";
import { lp, api } from "../../lib.js";
import { note, temp } from "./note.js";


// Some elements will visible if(user!=undefined)
// user will undefined or parse JSON object (what server response=> look pint utility r11)
const tempHeader = (user, onLogout) => lp.html `
<nav class="navbar navbar-expand-lg navbar-light bg-light ">
    <div class="container">
        <a class="navbar-brand" href="/profile">
            <img src="./images/idea.png" alt="">
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive"
            aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
                ${user
                ? lp.html` <li class="nav-item active">
                    <a class="nav-link" href="/dashboard">Dashboard</a>
                </li>
                <li class="nav-item active">
                    <a class="nav-link" href="/create">Create</a>
                </li>
                <li class="nav-item">
                    <a @click=${onLogout} class="nav-link" href="javascript:void(0)">Logout</a>
                </li>`
                    : lp.html` <li class="nav-item">
                    <a class="nav-link" href="/login">Login</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/register">Register</a>
                </li>`}
            </ul>
        </div>
    </div>
</nav>
<div id="notifications"></div>
  `;






export function loadHeader() {
    const user = _user.getUserData();

    async function onLogout() {
        await api.data.logout();
       note(temp.info('Logout successful.'));
        lp.page.redirect('/');
    }

    return tempHeader(user, onLogout);
}