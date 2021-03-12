import { html, render } from './node_modules/lit-html/lit-html.js';

const form = document.querySelector('form');

form.addEventListener('submit', onSubmit);

function onSubmit() {
    event.preventDefault();
    let formData = new FormData(form);
    let result = Array.from(formData.entries())
        .reduce((p, [k, v]) => Object.assign({
            [k]: v
        }), {})
    render(html `<ul></ul>`, document.querySelector('#root'));
    render(result['towns'].split(', ')
        .map((town) => html `<li>${town}</li>`), document.querySelector('#root > ul'));
    form.reset();
}