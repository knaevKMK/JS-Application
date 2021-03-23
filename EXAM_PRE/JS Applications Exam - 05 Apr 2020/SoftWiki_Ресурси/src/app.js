import { html, render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';

page('/', loadData, loadHome);
page('/index.html', loadData, loadHome);

page.start();

function loadData(ctx, next) {
    ctx.render = (content) => render([loadHome], main);
    next();
}