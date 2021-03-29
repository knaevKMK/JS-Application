import { lp } from './lib.js';


import { tempFooter } from './views/elements/footer.js';
import { loadHeader } from './views/elements/header.js';

import { pageHome } from './views/home.js';
import { pageCatalog } from './views/catalog.js';
import { pageCreate } from './views/create.js';
import { pageDetails } from './views/details.js';
import { pageLogin } from './views/login.js';
import { pageRegister } from './views/register.js';

//TODO check where to render
const main = document.querySelector('#container');

//home Page +Logout
lp.page('/index.html', _toDo, pageHome);
lp.page('/', _toDo, pageHome);
//Details + Delete
lp.page('/details/:id', _toDo, pageDetails);
//Catalog
lp.page('/catalog', _toDo, pageCatalog);
//Create
lp.page('/edit', _toDo, pageCreate);
lp.page('/edit/:id', _toDo, pageCreate);
//Register
lp.page('/register', _toDo, pageRegister);
//Login
lp.page('/login', _toDo, pageLogin);



lp.page.start();

function _toDo(ctx, next) {
    ctx.render = (content) => lp.render([loadHeader(), content, tempFooter()], main);
    next();
}