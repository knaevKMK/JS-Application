import { html } from "../../node_modules/lit-html/lit-html.js";

const navBar = (email) => html `
<nav class="navbar navbar-expand-lg navbar-dark bg-dark ">
            <a class="navbar-brand text-light" href="/">Movies</a>
            <ul class="navbar-nav ml-auto ">
                <li class="nav-item">
                    <a class="nav-link">Welcome${`, ${email ? email : ''}`}</a>
                </li>
                ${email == null
        ? html` <li class="nav-item" ><a class="nav-link" href="/login">Login</a></li>
            <li class="nav-item" ><a class="nav-link" href="/register">Register</a></li>`
        : html`<li class="nav-item" ><a class="nav-link" href="/logout">Logout</a></li>`
    }
            </ul>
            </nav>`
    ;

export function loadNavBar() {
    let email = sessionStorage.getItem('email');
    return navBar(email);
}