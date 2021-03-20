import { html } from '../../node_modules/lit-html/lit-html.js';
import { createTeam, getFormData } from '../api/data.js';
import page from '../../node_modules/page/page.mjs';
import { tempSuccess } from './loading.js';

const tempCreate = (onSubmit, err) => html `<main>
    <section id="create">
        <article class="narrow">
            <header class="pad-med">
                <h1>New Team</h1>
            </header>
            <form @submit=${onSubmit} id="create-form" class="main-form pad-large">
                <div class="error">${err ? 'All fields required' : ''}</div>
                <label>Team name: <input type="text" name="name"></label>
                <label>Logo URL: <input type="text" name="logoUrl"></label>
                <label>Description: <textarea name="description"></textarea></label>
                <input class="action cta" type="submit" value="Create Team">
            </form>
        </article>
    </section>
</main>`;

export async function loadCreate(ctx) {
    ctx.render(tempCreate(onSubmit));
    async function onSubmit() {
        event.preventDefault();
        const formData = getFormData(event.target);
        const response = await createTeam(formData);
        console.log(response);
        ctx.render(tempSuccess('created team'))
        setTimeout(() => {
            page.redirect('/teams')
        }, 1000);
    }
}