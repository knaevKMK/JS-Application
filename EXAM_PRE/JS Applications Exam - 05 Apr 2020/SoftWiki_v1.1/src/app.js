import { render, page } from './library/import.js';
import { loadCreate } from './views/creater.js';
import { loadDetails } from './views/details.js';
import { loadEdit } from './views/edit.js';
import { tempFooter } from './views/elements/footer.js';
import { loadHeader } from './views/elements/header.js';
import { loadHome } from './views/home.js';
import { loadLogin } from './views/login.js';
import { loadRegister } from './views/register.js';

const main = document.querySelector('body');

page('/', loadData, loadHome);
page('/edit/:id', loadData, loadEdit);
page('/details/:id', loadData, loadDetails);
page('/create', loadData, loadCreate);
page('/login', loadData, loadLogin);
page('/register', loadData, loadRegister);
page('/index.html', loadData, loadHome);

page.start();

function loadData(ctx, next) {
    ctx.render = (content) => render([loadHeader(), content, tempFooter()], main)
    next();
}