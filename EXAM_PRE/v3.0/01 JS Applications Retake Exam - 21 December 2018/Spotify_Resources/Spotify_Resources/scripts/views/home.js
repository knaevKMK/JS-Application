import { html, render } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import { logout } from '../api/data.js';
import { loadNotification, tempInfo, tempLoading } from './notification.js';

const tempHome = () => html `<section id="homeView">
<img class="m-auto background-image" width="100%" src="https://ma-hub.imgix.net/wp-images/2019/05/04185051/royalty-free-music-Background.jpg">
</section>`;

export function loadHome(ctx) {
    ctx.render(tempHome());
}


const tempHeader = (logged, onLogout) => html `
<nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <div class="collapse navbar-collapse" id="navbarText">

        <ul class="navbar-nav mr-auto">

        ${logged
        ?html   ` <li class="nav-item active">
                <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/allsongs">All Songs</a>
            </li>
            <li class="nav-item">
                <a class="nav-link " href="mysongs">My Songs</a>
            </li>`
    : ``
    }

        </ul>
        <ul class="navbar-nav justify-content-end">
        ${logged
        ?html   ` <li class="nav-item">
                <a class="nav-link" href="/">Welcome, ${sessionStorage.getItem('email')}!</a>
            </li>
            <li class="nav-item">
                <a @click=${onLogout} class="nav-link" href="javascript:void(0)">Logout</a>
            </li>`
    : ``
    }

        </ul>
        <ul class="navbar-nav mr-auto">
        </ul>
        <ul class="navbar-nav justify-content-end">
        ${logged
        ?  ``
    : html` <li class="nav-item">
                <a class="nav-link" href="/login">Login</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="register">Register</a>
            </li>`
    }
        </ul>
    </div>
</nav>`;


export function loadHeader() {
    const logged = sessionStorage.getItem('email') != null
    return tempHeader(logged,onLogout);

    async function onLogout(){
       loadNotification(tempLoading());
        console.log('logout')
        await logout();
        loadNotification(tempInfo('Successful log-out'))
        sessionStorage.clear();
        page.redirect('/');
    }
}
export const tempFooter =  html `<footer class="card-footer text-muted d-flex justify-content-center">
    &copy; SoftUni JS Core Apps Exams
</footer>`;