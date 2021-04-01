import { html } from '../../node_modules/lit-html/lit-html.js';



const tempHeader = (email) => html `
<header>
    <nav>
        <ul>
            ${email ?
            html`<li><a href="/create">Create new offer</a></li>`
            : html`<li class="site-logo">Shoe</li>`
        }
            <li><a href="/">
                    <img src="../public/sneakers.png" alt="">
                </a> </li>
            ${email ?
            html` <li>Welcome, ${email} |
                <a href="/logout">Logout</a>
            </li>`
            : html`<li class="site-logo">Shelf</li>`
        }
        </ul>
    </nav>
</header>`;
const tempFooter = () => html`<footer>
    <p><a href="https://softuni.bg">Software University</a> - JS Applications @ 2020</p>
</footer>`;

export function loadHeader(ctx) {
    let email = sessionStorage.getItem('email');
    return tempHeader(email);
}

export function loadFooter(ctx) {

    return (tempFooter());
}