import { lp, api } from '../lib.js';

//TODO item.proto & attach submit on the form
// notes: err on if & after await
const tempEdit = (item, onSubmit) => lp.html`
<section id="edit-listing">
    <div class="container">

        <form @submit=${onSubmit} id="edit-form">
            <h1>Edit Car Listing</h1>
            <p>Please fill in this form to edit an listing.</p>
            <hr>

            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand" value="${item.brand}">

            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model" value="${item.model}">

            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description" value="${item.description}">

            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year" value="${item.year}">

            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl" value="${item.imageUrl}">

            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price" value="${item.price}">

            <hr>
            <input type="submit" class="registerbtn" value="Edit Listing">
        </form>
    </div>
</section>`;

export async function pageEdit(ctx) {
    const itemId = ctx.params.id;
    const item = await api.data.getItemById(itemId)
    ctx.render(tempEdit(item, onSubmit));


    async function onSubmit() {
        event.preventDefault();
        const fd = api.data.getFormData(event.target);
        console.log(fd);

       
        const brand = fd.brand.trim();
        const model = fd.model.trim();
        const description = fd.description.trim();
        const imageUrl = fd.imageUrl.trim();
        const price = Number(fd.price);
        const year = Number(fd.year);


        if (
            brand == '' ||
            model == '' ||
            description == '' ||
            imageUrl == '' ||
            price < 0 ||
            year < 0
        ) {
            return window.alert('All fields required');
        }

       
           await api.data.updateItem(itemId, { 
            brand,
            model,
            description,
            year,
            imageUrl,
            price });
            //Check redirect
            lp.page.redirect('/details/'+itemId);
      
    }
}