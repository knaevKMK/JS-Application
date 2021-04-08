import { _user } from '../api/utility.js';
import { lp, api } from '../lib.js';


const tempCreate = (onSubmit) => lp.html`<h1>Create New Offer</h1>
<p class="message"></p>
<form @submit=${onSubmit}>
    <div>
        <input type="text" name="name" placeholder="Name...">
    </div>
    <div>
        <input type="number" name="price" placeholder="Price...">
    </div>
    <div>
        <input type="text" name="img" placeholder="Image url...">
    </div>
    <div>
        <textarea name="description" placeholder="Give us some description about this offer..."></textarea>
    </div>
    <div>
        <input type="text" name="brand" placeholder="Brand...">
    </div>
    <div>
        <button>Create</button>
    </div>
</form>`;

export function pageCreate(ctx) {
    ctx.render(tempCreate(onSubmit));
    async function onSubmit() {

        event.preventDefault();
        const fd = api.data.getFormData(event.target);
        console.log(fd);

        const brand = fd.brand.trim();
        const description = fd.description.trim();
        const img = fd.img.trim();
        const price = Number(fd.price);
        const name = fd.name.trim();

        //TODO CHECK IF & NOTE
        if (
            brand == '' ||
            img == '' ||
            description == '' ||
            name == '' ||
            price < 0
        ) {
            return window.alert('All fields required');
        }

        // {}
        await api.data.createItem({
            'brand': brand,
            'name': name,
            'img': img,
            'description':description,
            'price':price,
            'bought':0,
            '_creatorId':_user.getUserData()._id

        });

        //redirect
         lp.page.redirect('/');

    }
}