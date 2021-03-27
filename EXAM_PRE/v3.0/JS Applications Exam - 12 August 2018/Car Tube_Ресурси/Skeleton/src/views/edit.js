import { lp, api } from '../lib.js';
import { note, temp } from './elements/note.js';

//TODO item.proto & attach submit on the form
const tempEdit = (item, onSubmit) => lp.html `<div id="edit-listing">
    <form @submit=${onSubmit}>

        <div class="container">
            <h1>Edit Car Listing</h1>
            <p>Please fill in this form to edit an listing.</p>
            <hr>
            <input type="hidden" name="carId" value="" />

            <p>Title</p>
            <input type="text" placeholder="Enter Title" name="title" value="${item.title}">

            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description" value="${item.description}">

            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand" value="${item.brand}">

            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model" value="${item.model}">

            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year" value="${item.year}">

            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl" value="${item.imageUrl}">

            <p>Car Fuel Type</p>
            <input type="text" placeholder="Enter Car Fuel Type" name="fuel" value="${item.fuel}">

            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price" value="${item.price}">

            <hr>
            <button type="submit" class="registerbtn">Edit Listing</button>
        </div>
    </form>
</div>`;

export async function pageEdit(ctx) {
    const itemId = ctx.params.id;
    note(temp.loading());
    const item = await api.data.getItemById(itemId)
    note(lp.html ``);
    ctx.render(tempEdit(item, onSubmit));


    async function onSubmit() {
        event.preventDefault();
        const fd = api.data.getFormData(event.target);
        console.log(fd);
        // TODO check input fields


        //Check if statement
        if (fd.brand == "" ||
            fd.description == "" ||
            fd.fuel == "" ||
            fd.imageUrl == "" ||
            fd.model == "" ||
            fd.price == "" ||
            fd.title == "" ||
            fd.year == '') {
            return note(temp.err('All fields required'));
        }
        try {
            note(temp.loading());
            await api.data.editItem(itemId, fd);
            note(temp.info(`Listing ${fd.title} updated.`));
            //Check redirect
            lp.page.redirect('/catalog');
        } catch (err) {
            return note(temp.err(err.message));
        }
    }
}