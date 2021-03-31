import { lp } from '../lib.js';

const tempHome = () => lp.html `<main>
    <!-- Welcome Page ( Only for guest users ) -->
    <section id="welcome">
        <div id="welcome-container">
            <h1>Welcome To Meme Lounge</h1>
            <img src="/images/welcome-meme.jpg" alt="meme">
            <h2>Login to see our memes right away!</h2>
            <div id="button-div">
                <a href="/login" class="button">Login</a>
                <a href="/register" class="button">Register</a>
            </div>
        </div>
    </section>
</main>`;

export async function pageHome(ctx) {
    //CHECK if redirect after login

    // if (sessionStorage.getItem('email') != null) {
    //     lp.page.redirect('/catalog')
    // }
    ctx.render(tempHome());
}