import { addMovie } from '../api/data.js';
import { getFormData, html, loadErr, loadSuccess, page } from '../lib.js';

const tempAddMovie = (onSubmit) => html`<form @submit=${onSubmit} class="text-center border border-light p-5" action="" method="">
    <h1>Add Movie</h1>
    <div class="form-group">
        <label for="title">Movie Title</label>
        <input type="text" class="form-control" placeholder="Title" name="title" value="">
    </div>
    <div class="form-group">
        <label for="description">Movie Description</label>
        <textarea class="form-control" placeholder="Description" name="description"></textarea>
    </div>
    <div class="form-group">
        <label for="imageUrl">Image url</label>
        <input type="text" class="form-control" placeholder="Image Url" name="imageUrl" value="">
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
</form>`;



export function loadAddMovie(ctx) {
    ctx.render(tempAddMovie(onSubmit));

    async function onSubmit() {
        event.preventDefault();
        const fd = getFormData(event.target);
        console.log(fd);
        const data = {
            description: fd.description.trim(),
            img: fd.imageUrl.trim(),
            title: fd.title.trim(),
            _ownerId: sessionStorage.getItem('id')
        }

        if (data.description == '' || data.img == '' || data.title == '') {
            //    loadErr(`${data.description=='' ?'Description':''} ${data.img == '' ?'Image':''} ${data.title == '' ?'Title':''} reqired!`);
            loadErr('Invalid inputs!');
            return;
        }

        try {
            await addMovie(data);
            loadSuccess('Created successfully!');
        } catch (err) {
            loadErr(err, message)
        } finally { page.redirect('/') }
        // TODO if for fields and send request + notes
    }
}