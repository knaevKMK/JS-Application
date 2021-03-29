import { html, render } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import { getAllPets, getPetsByCategory, logout } from '../api/data.js';
import { loadNotification, tempError, tempInfo, tempLoading } from './notification.js';

const tempHome = (logged) => html `${!logged
? html`<main id="site-content">
    <section class="basic">
        <h1> Welcome to pet my pet!</h1>
    </section>
</main>`
: html` <main>
    <section class="dashboard">
        <h1>Dashboard</h1>
        <nav class="navbar">
            <ul>
                <li><a href="/categories/all">All</a></li>
                <li><a href="/categories/Cat">Cats </a> </li>
                <li><a href="/categories/Dog">Dogs</a></li>
                <li><a href="/categories/Parrot">Parrots</a></li>
                <li><a href="/categories/Reptile">Reptiles</a></li>
                <li><a href="/categories/Other">Other</a></li>
            </ul>
        </nav>
        <ul class="other-pets-list">
            ${renderPet(logged)}
        </ul>
    </section>
</main>`
}`;
function renderPet(pets) {
    return pets
        .sort((a, b) => b.counter - a.counter)
        .filter(p => p.owner != sessionStorage.getItem('email'))
        .map(p => html`<li class="otherPet">
    <h3>Name: ${p.name}</h3>
    <p>Category: ${p.category}</p>
    <p class="img"><img src="${p.imageURL}"></p>
    <p class="description">${p.description}</p>
    <div class="pet-info">
        <a id="${p._id}"><button class="button"><i class="fas fa-heart"></i>Pet</button></a>
        <a href="/details/${p._id}"><button class="button">Details</button></a>
        <i class="fas fa-heart"></i> <span>${p.counter}</span>
    </div>
</li>`)
}

export async function loadHome(ctx) {
    loadNotification(tempLoading());
    let logged = sessionStorage.getItem('email') != null
    if (logged) {
        logged = await getAllPets();
    }
    console.log(logged)
    loadNotification(html``);
    ctx.render(tempHome(logged));
}

export async function loadCategories(ctx) {
    console.log(ctx)
    loadNotification(tempLoading());
    let category = ctx.params.id;
    let logged = {};
    try {
        switch (category) {
            case 'all': logged = await getAllPets(); break;
            case 'Other':
                logged = await getAllPets();
                logged = logged.filter(p => p.category != 'Cat' && p.category != 'Dog' && p.category != 'Parrot' && p.category != 'Reptile')
                break;
            default: logged = await getPetsByCategory(category);
        }
    } catch (err) {
        loadNotification(tempError(err.message))
    }
    loadNotification(html``);
    ctx.render(tempHome(logged));
}


const tempHeader = (logged, onLogout) => html`<header id="site-header">
    <nav class="navbar">

        <section class="navbar-dashboard">
            <div class="first-bar">
                ${logged
                ? html` <a href="/">Dashboard</a>
                <a class="button" href="/mypets">My Pets</a>
                <a class="button" href="/addpet">Add Pet</a>`
            : ''}
            </div>
            <div class="second-bar">
                <ul>
                    ${logged
                ? html`<li>Welcome, ${sessionStorage.getItem('email')}!</li>
                    <li><a @click=${onLogout} href=""><i class="fas fa-sign-out-alt"></i> Logout</a></li>`
            : ''}
                </ul>
            </div>
        </section>
        <section class="navbar-anonymous">
            <ul>
                ${!logged
            ? html`<li><a href="/register"><i class="fas fa-user-plus"></i> Register</a></li>
                <li><a href="/login"><i class="fas fa-sign-in-alt"></i> Login</a></li>`
                : ''}

            </ul>
        </section>
    </nav>
</header>
`;


export function loadHeader() {
    const logged = sessionStorage.getItem('email') != null
    return tempHeader(logged, onLogout);

    async function onLogout() {
        loadNotification(tempInfo('log-out...'));
        console.log('logout')
        try {
            await logout();
            loadNotification(tempInfo('Successful log-out'))
            sessionStorage.clear();
        } catch (err) {
            loadNotification(tempError(err.messageq))
        } finally {
            page.redirect('/');
        }
    }
}
export const tempFooter = html`<footer id="site-footer">
    <p>@PetMyPet</p>
</footer>`;