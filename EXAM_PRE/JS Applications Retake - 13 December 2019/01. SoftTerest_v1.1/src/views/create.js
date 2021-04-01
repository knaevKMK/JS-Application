import { _user } from '../api/utility.js';
import { lp, api } from '../lib.js';
import { note, temp } from './elements/note.js';

//TODO attach the submit on the form
// notifications on if and after await and in the catch
const tempCreate = (onSubmit) => lp.html `
<div class="container home wrapper  my-md-5 pl-md-5">
    <div class=" d-md-flex flex-mb-equal ">
        <div class="col-md-6">
            <img class="responsive-ideas create" src="./images/creativity_painted_face.jpg" alt="">
        </div>
        <form @submit=${onSubmit} class="form-idea col-md-5" action="" method="">
            <div class="text-center mb-4">
                <h1 class="h3 mb-3 font-weight-normal">Share Your Idea</h1>
            </div>
            <div class="form-label-group">
                <label for="ideaTitle">Title</label>
                <input type="text" id="title" name="name" class="form-control" placeholder="What is your idea?"
                    required="" autofocus="">
            </div>
            <div class="form-label-group">
                <label for="ideaDescription">Description</label>
                <textarea type="text" name="description" class="form-control" placeholder="Description"
                    required=""></textarea>
            </div>
            <div class="form-label-group">
                <label for="inputURL">Add Image</label>
                <input type="text" id="imageURl" name="img" class="form-control" placeholder="Image URL" required="">

            </div>
            <button class="btn btn-lg btn-dark btn-block" type="submit">Create</button>

            <p class="mt-5 mb-3 text-muted text-center">© SoftTerest - 2019.</p>
        </form>
    </div>
</div>`;

export function pageCreate(ctx) {
    ctx.render(tempCreate(onSubmit));
    async function onSubmit() {

        event.preventDefault();
        const fd = api.data.getFormData(event.target);

        //TODO check object.proto
        const name = fd.name.trim();
        const description = fd.description.trim();
        const img = fd.img.trim();

        // //TODO CHECK IF & NOTE
        if (
            name.length < 6 ||
            (!img.startsWith('http://') && !img.startsWith('https://')) ||
            description.length < 10) {
            return note(temp.err('All fields required'));
        }

        await api.data.createItem({
            "name": name,
            "likes": 0,
            "description": description,
            "img": img,
            "comments": [],
            "creator": _user.getUserData().username
        });
        note(temp.info('Idea created successfully.'));
        //redirect
        lp.page.redirect('/dashboard');

    }
}