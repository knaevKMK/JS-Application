import { render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';

import { loadHome } from './views/home.js'
import { loadHeader } from './views/elements/header.js'
import { loadFooter } from './views/elements/footer.js'
import { loadLogin } from './views/login.js';
import { loadRegister } from './views/register.js';
import { logout } from './api/api.js';
import { loadError, loadSuccess } from './views/elements/modal.js';
import { loadCreate } from './views/create.js';
import { loadDetails } from './views/details.js';
import { loadProfile } from './views/profile.js';

const body = document.querySelector('body');
page('/index.html', loadData, loadHome);
page('/', loadData, loadHome);
page('/profile', loadData, loadProfile);
page('/details', loadData, loadDetails);
page('/create', loadData, loadCreate);
page('/login', loadData, loadLogin);
page('/register', loadData, loadRegister);

page.start();

function loadData(ctx, next) {
    ctx.render = (content) => render([loadHeader(), content, loadFooter()], body)
    next();
}
body.addEventListener('click', async() => {
    switch (event.target.id) {
        case 'logout':
            console.log('logout')
            try {
                const response = await logout();
                render([loadHeader(), loadSuccess('Logout successful!'), loadFooter()], body)
                sessionStorage.clear();
            } catch (err) {
                console.log(err);
                render([loadHeader(), loadError('Invalid credentials!'), loadFooter()], body)
            } finally {
                setTimeout(() => {
                    page.redirect('/');
                }, 1000);
            }
            break;
        case 'delete':
            console.log("delete");
            break;
        case 'lik':
            console.log("like");
            break;
    }
})