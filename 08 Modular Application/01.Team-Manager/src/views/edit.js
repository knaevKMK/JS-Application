import { html } from "../../node_modules/lit-html/lit-html.js";
import { editTeam, getFormData, getTeamById } from "../api/data.js";
import { tempLoading, tempSuccess } from './loading.js';
import page from '../../node_modules/page/page.mjs';
import { until } from '../../node_modules/lit-html/directives/until.js';

const tempEdit = (onSubmit, team, err) => html `<main>
    <section id="edit">
        <article class="narrow">
            <header class="pad-med">
                <h1>Edit Team</h1>
            </header>
            <form @submit=${onSubmit} id="edit-form" class="main-form pad-large">
                <div class="error">${err ? 'All fields required' : ''}</div>
                <label>Team name: <input type="text" name="name" value=${team.name}></label>
                <label>Logo URL: <input type="text" name="logoUrl" value=${team.logoUrl}></label>
                <label>Description: <textarea name="description">${team.description}</textarea></label>
                <input class="action cta" type="submit" value="Save Changes">
            </form>
        </article>
    </section>
</main>`;

export async function loadEdit(ctx) {
    // ctx.render(tempLoading('Loading...'));
    const teamId = ctx.params.id;
    const team = await getTeamById(teamId);
    ctx.render(until(tempEdit(onSubmit, team), tempLoading('Loading...')));
    // ctx.render(tempEdit(onSubmit, team));

    async function onSubmit() {
        event.preventDefault();
        const fData = getFormData(event.target);
        console.log(fData)
        if (fData.name.trim() == '' ||
            fData.description.trim() == '' ||
            fData.logoUrl.trim() == '') {
            ctx.render(tempEdit(onSubmit, team, true));
            return;
        }
        ctx.render(tempLoading('Edit current team...'));
        const response = await editTeam(teamId, fData);
        console.log(response)
        ctx.render(tempSuccess('edited'))
        setTimeout(() => {
            page.redirect('/details/' + teamId);
        }, 1000);
    }
}