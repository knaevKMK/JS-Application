import { html } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import { getAllMembersInTeamById, getTeamById } from '../api/data.js';


const tempDetails = (data, allMembersInTeam) => html `<main>
    <section id="team-home">
        <article class="layout">
            <img src=${data.logoUrl} class="team-logo left-col">
            <div class="tm-preview">
                <h2>${data.name}</h2>
                <p>Gotta catch 'em all!</p>
                <span class="details">3 Members</span>
                <div></div>
                ${getControls(allMembersInTeam, data)}
            </div>
            </div>
            <div class="pad-large">
                <h3>Members</h3>
                <ul class="tm-members">
                    <li>My Username</li>
                    ${getMember(allMembersInTeam, 'member')}

                </ul>
            </div>
            <div class="pad-large">
                <h3>Membership Requests</h3>
                <ul class="tm-members">
                    ${getMember(allMembersInTeam, 'pending', data)}
                </ul>
            </div>
        </article>
    </section>
</main>`;

function getControls(allM, data) {
    if (sessionStorage.getItem('id') !== null) {
        if (sessionStorage.getItem('id') === data._ownerId) {
            return html `<a href="/edit/${data._id}" class="action">Edit team</a>`;
        } else {
            let member = allM.find(m => m._id == sessionStorage.getItem('id'));
            console.log(member);
            if (member) {
                switch (member.status) {
                    case 'member':
                        return html `<a href="#" class="action invert">Leave team</a>`;
                    case 'pending':
                        return html `Membership pending. <a href="#">Cancel request </a>`;
                }
            }

            return html `<a href="#" class="action"> Join team</a>`
        }
    } else {
        return '';
    }
}

function getMember(allM, status, data) {
    console.log(data)
    console.log(allM)
    return allM
        .filter(m => m.status == status)
        .map(mem => {
            let user = data.find(m => m._id == mem._ownerId)
            switch (status) {
                case 'pending':

                    return html `<li>${user.name}<a href="#" class="tm-control action">Approve</a> <a href="#" class="tm-control action">Decline</a></li>`;
                case 'member':
                    console.log()
                    return html `<li>${user.name}<a href="#" class="tm-control action">Remove from team</a></li>`;
            }
        });
}
export async function loadDetails(ctx) {
    const teamId = ctx.params.id;
    const team = await getTeamById(teamId);
    const allMembersInTeam = await getAllMembersInTeamById(teamId);

    console.log(team);
    console.log(allMembersInTeam);

    ctx.render(tempDetails(team, allMembersInTeam));
}