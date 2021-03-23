import { html } from '../../node_modules/lit-html/lit-html.js';

export const tempLoading = (type) => html `<main>
    <div class="form-group" style="display: inline-flexbox;">
        <h3 style="  text-decoration:white underline;text-align: center;">${type}...</h3>
    </div>
</main>
`;

export const tempSuccess = (type) => html `<main>
    <div class="form-group" style="display: inline-flexbox; background-color:lightgreen;">
        <h3 style=" color: white; text-decoration:white underline;text-align: center;">Successful ${type}</h3>
    </div>
</main>
`;


export function loadModal(msg, btn) {
    return (html `<div id="modal" class="overlay"></div>
<div class="modal">
    <p>${msg}</p>
    <a href="/" class="action">${btn}</a>
</div>
</div>`);
}