import { lp } from './lib.js';
import { pageAllMemes } from './views/catalog.js';
import { pageCreate } from './views/create.js';
import { pageDetails } from './views/details.js';
import { pageEdit } from './views/edit.js';

import { tempFooter } from './views/elements/footer.js';
import { loadHeader } from './views/elements/header.js';
import { pageHome } from './views/home.js';
import { pageLogin } from './views/login.js';
import { pageProfile } from './views/profile.js';
import { pageRegister } from './views/register.js';


const main = document.querySelector('#container');
lp.page('/index.html', _toDo, pageHome);
lp.page('/', _toDo, pageHome);
lp.page('/profile', _toDo, pageProfile);
lp.page('/edit/:id', _toDo, pageEdit);
lp.page('/details/:id', _toDo, pageDetails);
lp.page('/catalog', _toDo, pageAllMemes);
lp.page('/create', _toDo, pageCreate);
lp.page('/register', _toDo, pageRegister);
lp.page('/login', _toDo, pageLogin);



lp.page.start();

function _toDo(ctx, next) {
    ctx.render = (content) => lp.render([loadHeader(), content, tempFooter()], main);
    next();
}