import { html } from '../../node_modules/lit-html/lit-html.js'

const tempHome = () => html ``;
const tempHeader = () => html ``;
const tempFooter = () => html ``;
export async function loadHome(ctx) {
    ctx.render(tempHome());
}
export async function loadHeader(ctx) {
    ctx.render(tempHeader());
}
export async function loadFooter(ctx) {
    ctx.render(tempFooter());
}