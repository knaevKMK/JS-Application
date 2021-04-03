import { lp, api } from '../lib.js';

//TODO attach the submit on the form
// notifications on if and after await and in the catch
const tempCreate = (onSubmit) => lp.html`
<section id="create-listing">
    <div class="container">
        <form @submit=${onSubmit} id="create-form">
            <h1>Create Car Listing</h1>
            <p>Please fill in this form to create an listing.</p>
            <hr>

            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand">

            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model">

            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description">

            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year">

            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl">

            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price">

            <hr>
            <input type="submit" class="registerbtn" value="Create Listing">
        </form>
    </div>
</section>`;

export function pageCreate(ctx) {
    ctx.render(tempCreate(onSubmit));
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

        await api.data.createItem({
            brand,
            model,
            description,
            year,
            imageUrl,
            price
           });

        //redirect
        lp.page.redirect('/catalog');

    }
}