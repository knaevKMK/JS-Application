import { html } from "../../node_modules/lit-html/lit-html.js";
import page from '../../node_modules/page/page.mjs';
import { editShoe, getShoeById } from "../api/data.js";


const editTemp = (onSubmit, item) => html `<h1>Edit Offer</h1>
<p class="message"></p>
<form @submit=${onSubmit}>
    <div>
        <input type="text" placeholder="Name..." value=${item.name}>
    </div>
    <div>
        <input type="text" placeholder="Price..." value=${item.price}>
    </div>
    <div>
        <input type=" text" placeholder="Image url..." value=${item.img}>
    </div>
    <div>
        <textarea placeholder=" Give us some description about this offer...">${item.description}</textarea>
    </div>
    <div>
        <input type="text" placeholder="Brand..." value=${item.brand}>
    </div>
    <div>
        <button>Edit</button>
    </div>
</form>`;

export async function loadEdit(ctx) {
    const itemId = ctx.params.id;
    const item = await getShoeById(itemId);
    console.log(item);
    ctx.render(editTemp(onSubmit, item));

    async function onSubmit() {
        event.preventDefault();

        const data = {
            name: event.target.children[0].children[0].value.trim(),
            price: event.target.children[1].children[0].value.trim(),
            img: event.target.children[2].children[0].value.trim(),
            description: event.target.children[4].children[0].value.trim(),
            brand: event.target.children[4].children[0].value.trim(),
            _creatorId: sessionStorage.getItem('id'),
        }
        console.log(data)

        const response = await editShoe(itemId, data);
        console.log(response)

        ctx.render(tempSuccess(response, true));
        setTimeout(() => {
            page.redirect('/')
        }, 1000);
    }
}
const tempSuccess = () => html `<div class="form-group" style="display: inline-flexbox; background-color:lightgreen;">
    <h3 style=" color: white; text-decoration:white underline;text-align: center;">Successful edited</h3>
</div>
`;