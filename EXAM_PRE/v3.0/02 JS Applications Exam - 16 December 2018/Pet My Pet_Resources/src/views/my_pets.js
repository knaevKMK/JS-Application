import { html, render } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import { deletePet, getMyPets, getPetById, logout } from '../api/data.js';
import { loadNotification, tempError, tempInfo, tempLoading } from './notification.js';

let myPets = {};
const tempMyPets = (pets) => html `<main>
    <section class="my-pets">
        <h1>My Pets</h1>
        <ul class="my-pets-list">
            ${renderMyPet(pets)}
        </ul>
    </section>
</main>`;

function renderMyPet(pets) {
    return pets.map(pet => html `<section class="myPet">
    <h3>Name: ${pet.name}</h3>
    <p>Category: Cat</p>
    <p class="img"><img src="${pet.imageURL}"></p>
    <p class="description">${pet.description}</p>
    <div class="pet-info">
        <a href="/details/${pet._id}"><button class="button">Details</button></a>
        <a href="/delete/${pet._id}"><button class="button">Delete</button></a>
        <i class="fas fa-heart"></i> <span>${pet.counter}</span>
    </div>
</section>`)
}
export async function loadMyPets(ctx) {
    myPets = await getMyPets();
    console.log(myPets);
    ctx.render(tempMyPets(myPets, loadDelete));
}


const tempDelete = (pet, onDelete) => html `<section class="deletePet">
    <h3>${pet.name}</h3>
    <p>Pet counter: <i class="fas fa-heart"></i> ${pet.counter}</p>
    <p class="img"><img src="${pet.imageURL}"></p>
    <form @submit=${onDelete} action="" method="">
        <p class="description">${pet.description}</p>
        <button class="button">Delete</button>
    </form>
</section>`
export async function loadDelete(ctx) {
    const petId = ctx.params.id;
    loadNotification(tempLoading());
    try {
        const pet = await getPetById(petId);
        loadNotification(html ``);
        ctx.render(tempDelete(pet, onDelete));
    } catch (err) {
        loadNotification(tempError(err.message))
        page.redirect('/');
    }

    async function onDelete() {
        event.preventDefault();
        loadNotification(tempInfo('Deleting...'));
        try {
            const response = await deletePet(petId)
            loadNotification(tempInfo('Successful remove your pet!'))
        } catch (err) {
            loadNotification(tempError(err.message))
        } finally {
            page.redirect('/mypets')
        }
    }
}