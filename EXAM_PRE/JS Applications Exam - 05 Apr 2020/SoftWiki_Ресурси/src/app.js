import { render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import { loadCreate } from './views/create.js';
import { loadDetails } from './views/details.js';
import { loadEdit } from './views/edit.js';
import { loadFooter, loadHome, loadHeader } from './views/home.js';
import { loadLogin } from './views/login.js';
import { loadRegister } from './views/register.js';

const main = document.querySelector('body')
page('/', loadData, loadHome);
page('/details/:id', loadData, loadDetails);
page('/edit/:id', loadData, loadEdit);
page('/create', loadData, loadCreate);
page('/login', loadData, loadLogin);
page('/register', loadData, loadRegister);
page('/index.html', loadData, loadHome);

page.start();

function loadData(ctx, next) {
    ctx.render = (content) => render([loadHeader(), content, loadFooter()], main);
    next();
}