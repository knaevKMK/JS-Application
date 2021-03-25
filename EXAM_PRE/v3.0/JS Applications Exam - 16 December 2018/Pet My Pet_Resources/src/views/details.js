import { html, render } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import { editPet, getFormData, getMyPets, getPetById, logout } from '../api/data.js';
import { loadNotification, tempError, tempInfo, tempLoading } from './notification.js';


const tempDetailPet = (pet, onSubmit) => html `<main>
    ${renderMyPets(pet,onSubmit)}
</main>`;

function renderMyPets(pet, onSubmit) {

    return html `<section class=
                ${pet.owner == sessionStorage.getItem('email') ? "detailsMyPet" : "detailsOtherPet"}>
    <h3>${pet.name}</h3>
    <p>Pet counter: ${pet.owner == sessionStorage.getItem('email')
                            ? html`<i class="fas fa-heart"></i> ${pet.counter}`
                            : html`${pet.counter} <a id="${pet._id}" ><button class="button"><i class="fas fa-heart"></i>Pet</button>`}
    </p>
    <p class="img"><img src="${pet.imageURL}"></p>
                            ${pet.owner == sessionStorage.getItem('email')
                        ? html`<form @submit=${onSubmit} action="" method=""><textarea type="text" name="description">${pet.description}</textarea>
                        <button  class="button"> Save</button></form>`
                        : html`<p class="description">${pet.description}</p>`}
</section>`;
}
export async function loadDetails(ctx) {
    loadNotification(tempLoading());
    const petId = ctx.params.id;
    const pet = await getPetById(petId);
    loadNotification(html``);
    console.log(pet)
    ctx.render(tempDetailPet(pet,onSubmit));

    async function onSubmit(){
        event.preventDefault();
loadNotification(tempInfo('Editing....'))
        pet.description=event.target.children[0].value.trim();
        if(pet.description==''){
loadNotification(tempError('Description field required!'))
            return;
        }
        try{
            const response = await editPet(petId,pet)
            console.log(response);
            loadNotification(tempInfo('You Successful Edit your pet details'))
            page.redirect('/mypets');
        }catch(err){
            loadNotification(tempError('Bad request'))
        }

    }
}