// this SPA works only with new create data, user, post, comments.
// The app was re-build form Kinley back-end to localhost server attached here.
// To start server open cmd and use command node server.js



import { lp } from './lib.js';

import { tempFooter } from './views/elements/footer.js';
import { loadHeader, loadNavBar } from './views/elements/header.js';

import { pageHome } from './views/home.js';
import { pageCatalog } from './views/catalog.js';
import { pageCreate } from './views/create.js';
import { pageDetails } from './views/details.js';
import { pageEdit } from './views/edit.js';
import { pageProfile } from './views/profile.js';
import { pageComments } from './views/comments.js';

//TODO check where to render
const main = document.querySelector('#container');

//home Page +Logout
lp.page('/index.html', _toDo, pageHome);
lp.page('/', _toDo, pageHome);
// Profile Page or MyItems
lp.page('/profile', _toDo, pageProfile);
//Edit Page
lp.page('/edit/:id', _toDo, pageEdit);
//Details + Delete
lp.page('/details/:id', _toDo, pageDetails);
//Catalog
lp.page('/catalog', _toDo, pageCatalog);
//Create
lp.page('/create', _toDo, pageCreate);
lp.page('/comments/:id', _toDo, pageComments);



lp.page.start();

function _toDo(ctx, next) {
    ctx.render = (content) => lp.render([loadHeader(), lp.html `<div class="content">${[loadNavBar(), content]}</div>`, tempFooter()], main);
    next();
}