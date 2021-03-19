import { html } from "../../node_modules/lit-html/lit-html.js";
import page from '../../node_modules/page/page.mjs';

const createTemp = (onSubmit) => html `<main>
    <h1>Create New Offer</h1>
    <p class="message"></p>
    <form @submit=${onSubmit}>
        <div>
            <input type="text" placeholder="Name...">
        </div>
        <div>
            <input type="text" placeholder="Price...">
        </div>
        <div>
            <input type="text" placeholder="Image url...">
        </div>
        <div>
            <textarea placeholder="Give us some description about this offer..."></textarea>
        </div>
        <div>
            <input type="text" placeholder="Brand...">
        </div>
        <div>
            <button>Create</button>
        </div>
    </form>
</main>`;

export function loadCreate(ctx) {

    ctx.render(createTemp(onSubmit));

    async function onSubmit() {
        event.preventDefault();
        const data = {
            name: event.target.children[0].children[0].value.trim(),
            price: event.target.children[1].children[0].value.trim(),
            img: event.target.children[2].children[0].value.trim(),
            description: event.target.children[4].children[0].value.trim(),
            brand: event.target.children[4].children[0].value.trim(),
            creator: sessionStorage.getItem('id'),
        }
        console.log(data)

        const response = await (await fetch('http://localhost:3030/jsonstore/shoes/catalog', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })).json();
        console.log(response)

        ctx.render(tempSuccess());
        setTimeout(() => {
            page.redirect('/')
        }, 1000);
    }
}

const tempSuccess = () => html `<div class="form-group" style="display: inline-flexbox; background-color:lightgreen;">
    <h3 style=" color: white; text-decoration:white underline;text-align: center;">Successful created</h3>
</div>
`;