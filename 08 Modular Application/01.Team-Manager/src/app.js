import { render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import { loadTeams } from './teams.js';
import { loadCreate } from './views/create.js';
import { loadDetails } from './views/details.js';
import { loadEdit } from './views/edit.js';


import { loadFoot, loadHead, loadHome } from './views/home&&head&&foot.js';
import { loadMyTeams } from './views/myTeams.js';
import { loadLogin, loadRegister, loadLogout } from './views/userSessions.js';
//window.api=api;
const main = document.querySelector('div#content')

page('/', loadData, loadHome);
page('/details/:id', loadData, loadDetails);
page('/edit/:id', loadData, loadEdit);
page('/create', loadData, loadCreate);
page('/myteams', loadData, loadMyTeams);
page('/teams', loadData, loadTeams);
page('/index.html', loadData, loadHome);
page('/register', loadData, loadRegister);
page('/login', loadData, loadLogin);

page.start();

function loadData(ctx, next) {
    ctx.render = (content) => render([loadHead(), content, loadFoot()], main);
    next();
}

document.querySelector('#titlebar').addEventListener('click', () => {

    if (event.target.id === 'logout') {
        loadLogout();
    }
})