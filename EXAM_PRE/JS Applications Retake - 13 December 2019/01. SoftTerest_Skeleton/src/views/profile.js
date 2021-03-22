import { html } from "../../node_modules/lit-html/lit-html.js";

const tempProfile = () => html `<div class="container home wrapper  my-md-5 pl-md-5">
    <div class="profile home-text col-md-6 text-center col-lg">
        <img class="profile-img" src="./images/user.png" />
        <div class="profile-info">
            <p>Username: <small>${sessionStorage.getItem('email')}</small></p>
            <p class="infoType">Has 2 ideas =)</p>
            <p>Dinner Recipe</p>
            <p>4 easy DIY ideas to try!</p>
            <p>No ideas yet</p>
        </div>
    </div>
</div>`;

export async function loadProfile(ctx) {
    console.log('Profile');

    ctx.render(tempProfile());
}