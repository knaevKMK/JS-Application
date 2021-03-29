import { lp, api } from '../lib.js';
import { note, temp } from './elements/note.js';

//TODO attach the submit on the form
const tempCreate = (onSubmit) => lp.html `<div id="create-listing">
    <form @submit=${onSubmit}>
        <div class="container">
            <h1>Create Car Listing</h1>
            <p>Please fill in this form to create an listing.</p>
            <hr>

            <p>Title</p>
            <input type="text" placeholder="Enter Title" name="title">

            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description">

            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand">

            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model">

            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year">

            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl">

            <p>Car Fuel Type</p>
            <input type="text" placeholder="Enter Car Fuel Type" name="fuel">

            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price">

            <hr>
            <button type="submit" class="registerbtn">Create Listing</button>
        </div>
    </form>
</div>`;

export function pageCreate(ctx) {
    ctx.render(tempCreate(onSubmit));
    async function onSubmit() {

        event.preventDefault();
        const fd = api.data.getFormData(event.target);
        console.log(fd);
        //TODO check object.proto

        //TODO CHECK IF & NOTE
        if (
            fd.brand == "" ||
            fd.description == "" ||
            fd.fuel == "" ||
            fd.imageUrl == "" ||
            fd.model == "" ||
            fd.price == "" ||
            fd.title == "" ||
            fd.year == ''
        ) {
            return note(temp.err('All fields required'));
        }
        fd.seller = sessionStorage.getItem('email');
        try {
            note(temp.loading());
            await api.data.createItem(fd);
            note(temp.info('Listing created.'))
            lp.page.redirect('/catalog');
        } catch (err) {
            return note(err.message)
        }
    }
}