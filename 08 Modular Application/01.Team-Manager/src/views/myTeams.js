import { html } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import { tempLoading, tempSuccess } from './loading.js';
import { tempArt } from '../teams.js';
import { getOwnTeams } from '../api/data.js';
import { until } from '../../node_modules/lit-html/directives/until.js';

const tempMyTeams = (data) => html `<main>
    <section id="my-teams">

        <article class="pad-med">
            <h1>My Teams</h1>
        </article>
        <article class="layout narrow">
        <div class="pad-med"></div>
             ${data.length==0
                    ? html`
            <p>You are not a member of any team yet.</p>
            <p><a href="/teams">Browse all teams</a> to join one, or use the button bellow to cerate your own team.
            </p>`
          : '' } </div> <div class=""><a href="/create" class="action cta">Create Team</a></div>
        </article>
      ${tempArt(data)}
    </section>


</main>`;

export async function loadMyTeams(ctx) {
    // ctx.render(tempLoading('Loading...'));
    const userId = sessionStorage.getItem('id');
    const data =await getOwnTeams(userId);

    // ctx.render(tempMyTeams(data));
    ctx.render(until(tempMyTeams(data),tempLoading('Loading...')));
}