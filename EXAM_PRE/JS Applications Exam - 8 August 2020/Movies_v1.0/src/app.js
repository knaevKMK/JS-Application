import { render } from "../node_modules/lit-html/lit-html.js";
import page from '../node_modules/page/page.mjs'

import { loadNavBar } from './views/naviBar.js';
import { footTemp } from "./views/footer.js";
import { loadHome } from './views/home.js';
import { loadLogin } from './views/login.js';
import { loadRegister } from "./views/register.js";
import { logOut } from "./views/logout.js";
import { loadAddMovie } from "./views/addMovie.js";
import { loadDetails } from "./views/detailsMovie.js";
import { loadDelete } from "./views/delete.js";
import { loadEdit } from "./views/editMovie.js";
import { loadLike } from "./views/like.js";

import * as api from './api/data.js'

const body = document.querySelector('#container ');
window.api = api;

page('/', loadData, loadHome);
page('/index.html', loadData, loadHome);
page('/login', loadData, loadLogin);
page('/register', loadData, loadRegister);
page('/logout', loadData, logOut);
page('/create', loadData, loadAddMovie);
page('/details/:id', loadData, loadDetails);
page('/delete/:id', loadData, loadDelete);
page('/edit/:id', loadData, loadEdit);
page('/like/:id', loadData, loadLike);



page.start();

function loadData(ctx, next) {
    ctx.render = (content) => render([loadNavBar(), content, footTemp()], body);
    next();
}