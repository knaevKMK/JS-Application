import { lp } from '../lib.js';

const tempHome = () => lp.html `<div id="main">
    <div id="welcome-container">
        <h1>Welcome To Car Tube</h1>
        <img src="./style/images/finance-car.png" alt="carIntro">
        <h2>Login or register to check out our listings or to make one</h2>
        <div id="button-div">
            <a href="/login" class="button">Login</a>
            <a href="/register" class="button">Register</a>
        </div>
    </div>
</div>`;

export async function pageHome(ctx) {

    if (sessionStorage.getItem('email') != null) {
        lp.page.redirect('/catalog')
    }
    ctx.render(tempHome());
}