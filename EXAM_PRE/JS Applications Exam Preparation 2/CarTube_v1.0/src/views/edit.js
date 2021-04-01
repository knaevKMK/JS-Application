import { lp, api } from '../lib.js';
import { note } from './elements/note.js';

//TODO item.proto & attach submit on the form
const tempEdit = (item, onSubmit) => lp.html `<main id="site-content">
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
    </section>
</main>`;

export async function pageEdit(ctx) {
    const itemId = ctx.params.id;
    console.log(itemId)
    const item = await api.data.getListById(itemId)
    ctx.render(tempEdit(item, onSubmit));


    async function onSubmit() {
        event.preventDefault();
        const fd = api.data.getFormData(event.target);
        console.log(fd);
        // TODO check input fields
        fd.year = Number(fd.year);
        fd.price = Number(fd.price);
        if (fd.brand.trim() == '' ||
            fd.model.trim() == '' ||
            fd.description.trim() == '' ||
            fd.year < 0 ||
            fd.imageUrl.trim() == '' ||
            fd.price < 0) {
            return window.alert('All fields required');
        }

        try {
            await api.data.updateList(itemId, fd);
            //Check redirect
            lp.page.redirect('/details/' + itemId);
        } catch (err) {
            return window.alert(err.message)
        }
    }
}