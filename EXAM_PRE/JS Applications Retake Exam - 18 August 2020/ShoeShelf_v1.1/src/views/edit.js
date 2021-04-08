import { _user } from '../api/utility.js';
import { lp, api } from '../lib.js';

//TODO item.proto & attach submit on the form
// notes: err on if & after await
const tempEdit = (item, onSubmit) => lp.html `   <h1>Edit Offer</h1>
<p class="message"></p>
<form @submit=${onSubmit}>
    <div>
        <input type="text"  name="name" value="${item.name}" placeholder="Name...">
    </div>
    <div>
        <input type="number" name="price" value="${item.price}" placeholder="Price...">
    </div>
    <div>
        <input type="text" name="img" value="${item.img}" placeholder="Image url...">
    </div>
    <div>
        <textarea name="description" placeholder="Give us some description about this offer...">${item.description}</textarea>
    </div>
    <div>
        <input type="text" name="brand" value="${item.brand}" placeholder="Brand...">
    </div>
    <div>
        <button>Edit</button>
    </div>
</form>`;

export async function pageEdit(ctx) {
    const itemId = ctx.params.id;
    const item = await api.data.getItemById(itemId)
    ctx.render(tempEdit(item, onSubmit));


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
        await api.data.updateItem(itemId,{
            'brand': brand,
            'name': name,
            'img': img,
            'description':description,
            'price':price,
            'bought':fd.bought,
            '_creatorId':_user.getUserData()._id

        });
            lp.page.redirect('/');
       
    }
}