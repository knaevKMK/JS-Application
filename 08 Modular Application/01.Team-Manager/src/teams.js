import { html } from '../node_modules/lit-html/lit-html.js';
// import{}from '../node_modules/lit-html/directives';
import { until } from '../node_modules/lit-html/directives/until.js';
import { getCatalog } from './api/data.js';
import { loadModal, tempLoading } from './views/loading.js';

const tempTeams = (data) => html `<main>
    <section id="browse">
        <article class="pad-med">
            <h1>Team Browser</h1>
        </article>
        ${sessionStorage.getItem('email') == null
                ? ''
                : html`<article class="layout narrow">
            <div class="pad-small"><a href="/create" class="action cta">Create Team</a></div>
        </article>`
      }
        ${ tempArt(data)}
    </section>
</main>`;

export  const tempArt = (data) => {
    console.log(data);

    return data.map( (e) => {
        let members = ( 0);
        //TODO members count
        //await getMemberCountOfTeam(data._id);
         console.log(members);
       return html`
<article class="layout">
    <img src=${e.logoUrl} class="team-logo left-col">
    <div class="tm-preview">
        <h2>${e.name}</h2>
        <p>${e.description}</p>
        <span class="details">${members} Members</span>
        <div><a href="/details/${e._id}" class="action">See details</a></div>
    </div>
</article>
`;});
}

export async function loadTeams(ctx) {
    ctx.render(tempLoading('Loading...'));
    const data = await getCatalog();
    ctx.render( tempTeams(data));
}