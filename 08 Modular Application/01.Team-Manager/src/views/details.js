import { html } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import { getTeamById, sendJoin } from '../api/data.js';


const tempDetails = (onJoin, data) => html `<main>
    <section id="team-home">
        <article class="layout">
            <img src=${data.logoUrl} class="team-logo left-col">
            <div class="tm-preview">
                <h2>${data.name}</h2>
                <p>Gotta catch 'em all!</p>
                <span class="details">3 Members</span>
                <div></div>
                ${getControls(onJoin,  data)}
            </div>
            </div>
            <div class="pad-large">
                <h3>Members</h3>
                <ul class="tm-members">
                    <li>My Username</li>
                    ${getMember(onJoin,  'member')}

                </ul>
            </div>
            <div class="pad-large">
                <h3>Membership Requests</h3>
                <ul class="tm-members">
                    ${getMember(onJoin,  'pending', data)}
                </ul>
            </div>
        </article>
    </section>
</main>`;

function getControls(onJoin, data) {
    if (sessionStorage.getItem('id') !== null) {
        if (sessionStorage.getItem('id') === data._ownerId) {
            return html `<a href="/edit/${data._id}" class="action">Edit team</a>`;
        } else {
            // let member = allM.find(m => m._id == sessionStorage.getItem('id'));
            // console.log(member);
            // if (member) {
            //     switch (member.status) {
            //         case 'member':
            //             return html `<a href="#" class="action invert">Leave team</a>`;
            //         case 'pending':
            //             return html `Membership pending. <a href="#">Cancel request </a>`;
            //     }
            // }

            return html `<a @click=${onJoin} href="javascript:void(0)" class="action"> Join team</a>`
        }
    } else {
        return '';
    }
}

function getMember(data) {

    //     return allM
    //         .filter(m => m.status == status)
    //         .map(mem => {

    //             switch (status) {
    //                 case 'pending':
    //                     return html `<li>${0}<a href="/details/${0}" class="tm-control action">Approve</a> <a href="#" class="tm-control action">Decline</a>
    // </li>`;
    //                 case 'member':
    //                     console.log()
    //                     return html `<li>${0}<a href="#" class="tm-control action">Remove from team</a></li>`;
    //             }
    //         });
}
export async function loadDetails(ctx) {
    const teamId = ctx.params.id;
    const team = await getTeamById(teamId);


    console.log(team);


    ctx.render(tempDetails(onJoin, team, ));

    async function onJoin() {
        console.log('Join');
        const response = await sendJoin({ 'teamId': teamId });
        console.log(response)
    }
}