import { lp } from './lib.js';


import { tempFooter } from './views/elements/footer.js';
import { loadHeader } from './views/elements/header.js';

import { pageHome } from './views/home.js';
import { pageCatalog } from './views/discover.js';

import { pageLogin } from './views/login.js';
import { pageProfile } from './views/profile.js';
import { pageRegister } from './views/register.js';

//TODO check where to render
const main = document.querySelector('#main');

//home Page +Logout
lp.page('/index.html', _toDo, pageHome);
lp.page('/', _toDo, pageHome);
// Profile Page
lp.page('/profile/:id', _toDo, pageProfile);
//Discover
lp.page('/discover', _toDo, pageCatalog);
//Register
lp.page('/register', _toDo, pageRegister);
//Login
lp.page('/login', _toDo, pageLogin);



lp.page.start();

function _toDo(ctx, next) {
    ctx.render = (content) => lp.render([loadHeader(), content, tempFooter()], main);
    next();
}