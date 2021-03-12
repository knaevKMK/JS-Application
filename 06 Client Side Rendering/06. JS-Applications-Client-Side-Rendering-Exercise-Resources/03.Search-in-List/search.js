import { html, render } from '../node_modules/lit-html/lit-html.js';
import { towns } from './towns.js';
render(html `<ul></ul>`, document.querySelector('#towns'));


render(towns
    .map(town => html `
<li class="null">${town}</li>
`), document.querySelector('#towns > ul'));

let input = document.querySelector('article > input');
document.querySelector('article > button').addEventListener('click', search);

function search() {
    let regex = input.value.trim();

    if (regex === '') {
        return alert('The input field is Empty')
    }
    let matches = 0;
    Array.from(document.querySelector('#towns > ul').children)
        .forEach(town => {
            if (town.textContent.toLowerCase().includes(regex.toLowerCase())) {
                matches++;
                town.className = 'active';
            } else {
                town.className = 'null';
            }
        });
    render(html `<p>${matches == 0 ? 'No' : matches} ${matches == 1 ? 'match' : 'matches'} found</p > `, document.querySelector('#result'));

    input.value = '';
}