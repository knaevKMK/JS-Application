import { lp } from '../lib.js';

const tempHome = () => lp.html`
<section id="main">
    <div id="welcome-container">
        <h1>Welcome To Car Tube</h1>
        <img class="hero" src="/images/car-png.webp" alt="carIntro">
        <h2>To see all the listings click the link below:</h2>
        <div>
            <a href="/catalog" class="button">Listings</a>
        </div>
    </div>
</section>`;

export async function pageHome(ctx) {
    //CHECK if redirect after login

    // if (sessionStorage.getItem('email') != null) {
    //     lp.page.redirect('/catalog')
    // }
    ctx.render(tempHome());
}