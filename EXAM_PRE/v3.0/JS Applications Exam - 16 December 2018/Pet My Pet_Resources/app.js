import { render } from './node_modules/lit-html/lit-html.js';
import page from './node_modules/page/page.mjs';
import { editPet, getPetById } from './src/api/data.js';
import { loadAddPet } from './src/views/add_pet.js';
import { loadDetails } from './src/views/details.js';

import { loadCategories, loadHeader, loadHome, tempFooter } from './src/views/home.js';
import { loadLogin } from './src/views/login.js';
import { loadDelete, loadMyPets } from './src/views/my_pets.js';
import { loadRegister } from './src/views/register.js';
import { loadNotification, tempInfo, tempLoading } from './src/views/notification.js';


const main = document.querySelector('#container');

page('/', loadData, loadHome);
page('/details/:id', loadData, loadDetails);
page('/delete/:id', loadData, loadDelete);
page('/categories/:id', loadData, loadCategories);
page('/mypets', loadData, loadMyPets);
page('/register', loadData, loadRegister);
page('/login', loadData, loadLogin);
page('/index.html', loadData, loadHome);
page('/addpet', loadData, loadAddPet);


page.start();


function loadData(ctx, next) {
    ctx.render = (content) => render([loadHeader(), content, tempFooter], main)
    next();
}

window.addEventListener('click', () => {
    console.log(event.target);

    if (event.target.innerHTML.includes('Pet')) {
        onLike(event.target.parentNode.id);
    }
})

async function onLike(petId) {
    console.log('like');
    const pet = await getPetById(petId);
    console.log(pet);
    pet.counter++;
    const response = await editPet(petId, pet);
    loadNotification(tempInfo('Liked'))
    setTimeout(() => {
        page.redirect(window.location.href.substring(21));
    }, 1500);

}