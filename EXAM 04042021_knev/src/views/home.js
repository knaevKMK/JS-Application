import { lp } from '../lib.js';

const tempHome = () => lp.html `<h3>Test</h3>`;

export async function pageHome(ctx) {
    //CHECK if redirect after login

    // if (sessionStorage.getItem('email') != null) {
    //     lp.page.redirect('/catalog')
    // }
    ctx.render(tempHome());
}