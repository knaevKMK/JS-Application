import { html, render } from '../node_modules/lit-html/lit-html.js';
import { cats } from './catSeeder.js';

const shape = document.querySelector('#allCats');
render(html `<ul></ul>`, shape)
render(cats.map(cat => html `
<li>
    <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
    <div class="info">
         <button class="showBtn" @click=$>Show status code</button>
         <div class="status" style="display: none" id=${cat.id}>
            <h4>Status Code: ${cat.statusCode}</h4>
            <p>${cat.statusMessage}</p>
         </div>
    </div>
</li>
`), document.querySelector('#allCats > ul'));

shape.addEventListener('click', onClick);

function onClick() {
    if (event.target.tagName === 'BUTTON' && event.target.textContent === 'Hide status code') {
        event.target.textContent = 'Show status code';
        event.target.parentNode.children[1].style.display = 'none';

    } else if (event.target.tagName === 'BUTTON' && event.target.textContent === 'Show status code') {
        event.target.textContent = 'Hide status code';
        event.target.parentNode.children[1].style.display = 'block';
    }

}