import { html } from "../../../node_modules/lit-html/lit-html.js";



const tempHeader = (logged) => html `<nav class="navbar navbar-expand-lg navbar-light bg-light ">
    <div class="container">
        <a href="/" class="navbar-brand" href="">
            <img src="./images/idea.png" alt="">
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive"
            aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
                ${logged
            ? html` <li class="nav-item active">
                    <a href="/home" class="nav-link" href="">Dashboard</a>
                </li>
                <li class="nav-item active">
                    <a href="/create" class="nav-link" href="">Create</a>
                </li>
                <li class="nav-item">
                    <a id="logout" href="javascript:void(0)" class="nav-link" href="">Logout</a>
                </li>`
            : html` <li class="nav-item">
                    <a href="/login" class="nav-link" href="">Login</a>
                </li>
                <li class="nav-item">
                    <a href="register" class="nav-link" href="">Register</a>
                </li>`}
            </ul>
        </div>
    </div>
</nav>`

export function loadHeader() {
    const logged = sessionStorage.getItem('email') != null;
    return tempHeader(logged);
}