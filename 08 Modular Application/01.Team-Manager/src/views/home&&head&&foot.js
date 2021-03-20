import { html } from '../../node_modules/lit-html/lit-html.js';

const tempHome = (user) => html `<main>
    <section id="home">
        <article class="hero layout">
            <img src="/assets/team.png" class="left-col pad-med">
            <div class="pad-med tm-hero-col">
                <h2>Welcome to Team Manager!</h2>
                <p>Want to organize your peers? Create and manage a team for free.</p>
                <p>Looking for a team to join? Browse our communities and find like-minded people!</p>
                ${user
            ? html`<a href="/teams" class="action cta">Browse Teams</a>`
            : html`<a href="/login" class="action cta">Sign Up Now</a>`
        }
            </div>
        </article>
    </section>
</main>`;

export function loadHome(ctx) {
    const user = sessionStorage.getItem('email');
    ctx.render(tempHome(user));
}

const tempHead = (user) => html`
<header id="titlebar" class="layout">
    <a href="/" class="site-logo">Team Manager</a>
    <nav>
        <a href="/teams" class="action">Browse Teams</a>
        ${user
        ? html` <a href="/myteams" class="action">My Teams</a>
        <a id="logout" href="javascript:void(0)" class="action">Logout</a>`
            : html` <a href="/login" class="action">Login</a>
        <a href="/register" class="action">Register</a>`}
    </nav>
</header>`;
const tempFoot = () => html`<footer id="footer">
    SoftUni &copy; 2014-2021
</footer>`;

export function loadHead() {
    const user = sessionStorage.getItem('email');
    return tempHead(user);
}
export function loadFoot() {
    return tempFoot();
}