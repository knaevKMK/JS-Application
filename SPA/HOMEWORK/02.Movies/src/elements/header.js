import { _e } from '../io/createTag.js';

export function renderHeader() {
    let loged = `
    <li class="nav-item">
       <a class="nav-link" href="#">Login</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="#">Register</a>
    </li>`;
    let email = ``;

    if (sessionStorage.getItem('email') !== null) {
        loged = `<li class="nav-item">
<a class="nav-link" href="#">Logout</a>
</li>`;
        email = ': ' + sessionStorage.getItem('email');
    }
    document.querySelector('body').innerHTML = `
    <div class="container" id="container">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark ">
            <a class="navbar-brand text-light" href="index.html">Movies</a>
            <ul class="navbar-nav ml-auto ">
                <li class="nav-item">
                    <a class="nav-link">Welcome${email}</a>
                </li>
              ${loged}
            </ul>
        </nav>
    </div>`;

}

export function renderFooter() {

    document.querySelector('#container').appendChild(_e('footer', {
        innerHTML: `     <div class="footer-copyright text-center py-3">© 2021
        <a href="#" class="text-dark">JS Applications</a>
    </div>`,
        class: "page-footer font-small",
    }))

}