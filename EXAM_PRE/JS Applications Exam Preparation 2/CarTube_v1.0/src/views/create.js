import { lp, api } from '../lib.js';


//TODO attach the submit on the form
const tempCreate = (onSubmit) => lp.html `<main id="site-content">
    <section id="create-listing">
        <div class="container">
            <form @submit=${onSubmit}id="create-form">
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
    </section>
</main>`;

export function pageCreate(ctx) {
    ctx.render(tempCreate(onSubmit));
    async function onSubmit() {

        event.preventDefault();
        const fd = api.data.getFormData(event.target);
        console.log(fd);
        //TODO check object.proto
        fd.year = Number(fd.year);
        fd.price = Number(fd.price);
        //TODO CHECK IF & NOTE
        if (fd.brand.trim() == '' ||
            fd.model.trim() == '' ||
            fd.description.trim() == '' ||
            fd.year < 0 ||
            fd.imageUrl.trim() == '' ||
            fd.price < 0) {
            return window.alert('All fields required');
        }

        try {
            const response = await api.data.createList(fd);
            console.log(response)
            lp.page.redirect('/');
        } catch (err) {
            return window.alert(err.message)
        }
    }
}