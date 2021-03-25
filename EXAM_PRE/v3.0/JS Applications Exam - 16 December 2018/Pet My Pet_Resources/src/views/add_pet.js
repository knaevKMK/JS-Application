import { html, render } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import { getFormData, createPet } from '../api/data.js';
import { loadNotification, tempError, tempInfo, tempLoading } from './notification.js';


const tempAddPets = (onSubmit) => html `<main>
    <section class="create">
        <form @submit=${onSubmit} action="" method="">
            <fieldset>
                <legend>Add new Pet</legend>
                <p class="field">
                    <label for="name">Name</label>
                    <span class="input">
                        <input type="text" name="name" id="name" placeholder="Name" />
                        <span class="actions"></span>
                    </span>
                </p>
                <p class="field">
                    <label for="description">Description</label>
                    <span class="input">
                        <textarea rows="4" cols="45" type="text" name="description" id="description"
                            placeholder="Description"></textarea>
                        <span class="actions"></span>
                    </span>
                </p>
                <p class="field">
                    <label for="image">Image</label>
                    <span class="input">
                        <input type="text" name="imageURL" id="image" placeholder="Image" />
                        <span class="actions"></span>
                    </span>
                </p>
                <p class="field">
                    <label for="category">Category</label>
                    <span class="input">
                        <select type="text" name="category">
                            <option>Cat</option>
                            <option>Dog</option>
                            <option>Parrot</option>
                            <option>Reptile</option>
                            <option>Other</option>
                        </select>
                        <span class="actions"></span>
                    </span>
                </p>
                <input class="button" type="submit" class="submit" value="Add Pet" />
            </fieldset>
        </form>
    </section>
</main>`;

// category: "Reptile"
// description: ""
// imageURL: ""
// name: ""

export async function loadAddPet(ctx) {
    ctx.render(tempAddPets(onSubmit))
    async function onSubmit() {
        event.preventDefault();
        loadNotification(tempInfo('Creating...'));
        const fd = getFormData(event.target);

        if (fd.name.trim() == '' || fd.description.trim() == '' || fd.imageURL.trim() == '') {
            loadNotification(tempError('All fields required!'));
            return;
        }
        fd.owner = sessionStorage.getItem('email');
        console.log(fd);
        try {
            const response = await createPet(fd);
            loadNotification(tempInfo("Successful add your pet"));
            page.redirect('/mypets')
        } catch (err) {
            loadNotification(tempError('Something was wrong!'));
        }
    }
}