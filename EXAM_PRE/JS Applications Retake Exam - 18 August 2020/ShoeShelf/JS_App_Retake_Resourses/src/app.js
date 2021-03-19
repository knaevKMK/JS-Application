import page from '../node_modules/page/page.mjs';
import { render } from '../../../../../node_modules/lit-html/lit-html.js';

import * as api from './api/data.js';
import { loadHome } from './views/home.js';
import { loadFooter, loadHeader } from './views/headerAndFooter.js';
import { loadRegister } from './views/register.js';
import { loadLogin } from './views/login.js';
import { loadLogout } from './views/logout.js';
import { loadCreate } from './views/create.js';
import { loadDetails } from './views/details.js';
import { loadEdit } from './views/edit.js';
import { loadDelete } from './views/delete.js';
import { loadBuy } from './views/buy.js';

window.api = api;


const body = document.querySelector('body');


page('/', loadData, loadHome);
page('/buy/:id', loadData, loadBuy);
page('/edit/:id', loadData, loadEdit);
page('/delete/:id', loadData, loadDelete);
page('/details/:id', loadData, loadDetails);
page('/create', loadData, loadCreate);
page('/logout', loadData, loadLogout);
page('/login', loadData, loadLogin);
page('/register', loadData, loadRegister);
page('/index.html', loadData, loadHome);


page.start();

function loadData(ctx, next) {
    ctx.render = (content) => render([loadHeader(), content, loadFooter()], body);
    next();
}