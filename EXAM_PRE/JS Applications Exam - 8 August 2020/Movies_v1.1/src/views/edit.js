import { editMovie, getMovieById } from '../api/data.js';
import { getFormData, html, page } from '../lib.js';


const tempEdit = (onEdit, movie) => html`<form @submit=${onEdit} class="text-center border border-light p-5" action="" method="">
    <h1>Edit Movie</h1>
    <div class="form-group">
        <label for="title">Movie Title</label>
        <input type="text" class="form-control" placeholder="Movie Title" value="${movie.title}" name="title">
    </div>
    <div class="form-group">
        <label for="description">Movie Description</label>
        <textarea class="form-control" placeholder="Movie Description..."
            name="description">${movie.description}</textarea>
    </div>
    <div class="form-group">
        <label for="imageUrl">Image url</label>
        <input type="text" class="form-control" placeholder="Image Url" value="${movie.img}" name="imageUrl">
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
</form>`

export async function loadEdit(ctx) {
    const itemId = ctx.params.id;
    const data = await getMovieById(itemId);
    console.log(data)
    ctx.render(tempEdit(onEdit, data));

    async function onEdit() {
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
            await editMovie(itemId, data);
            loadSuccess('Eddited successfully');
        } catch (err) {
            loadErr(err, message)
        } finally { page.redirect('/') }
        // TODO if for fields and send request + notes

    }
}