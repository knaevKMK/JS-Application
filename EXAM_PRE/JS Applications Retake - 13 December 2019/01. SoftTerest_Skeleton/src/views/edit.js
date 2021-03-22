import { html } from "../../node_modules/lit-html/lit-html.js";
import { getFormData, editIdea, getIdeaById } from "../api/data.js";
import { loadError, loadSuccess } from "./elements/modal.js";
import page from '../../node_modules/page/page.mjs';

const tempEdit = (onSubmit, idea) => html `
<div class="container home wrapper  my-md-5 pl-md-5">
    <div class=" d-md-flex flex-mb-equal ">
        <div class="col-md-6">
            <img class="responsive-ideas create" src="./images/creativity_painted_face.jpg" alt="">
        </div>
        <form @submit=${onSubmit} class="form-idea col-md-5" action="" method="">
            <div class="text-center mb-4">
                <h1 class="h3 mb-3 font-weight-normal">Edit Your Idea</h1>
            </div>
            <div class="form-label-group">
                <label for="ideaTitle">Title</label>
                <input type="text" id="title" name="title" class="form-control" placeholder="What is your idea?"
                    required="" autofocus="" value="${idea.name}">
            </div>
            <div class="form-label-group">
                <label for="ideaDescription">Description</label>
                <textarea type="text" name="description" class="form-control" placeholder="Description"
                    required="">${idea.description}</textarea>
            </div>
            <div class="form-label-group">
                <label for="inputURL">Add Image</label>
                <input type="text" id="imageURl" name="imageURL" class="form-control" placeholder="Image URL"
                    required="" value="${idea.img}">

            </div>
            <button class="btn btn-lg btn-dark btn-block" type="submit">Edit</button>

            <p class="mt-5 mb-3 text-muted text-center">© SoftTerest - 2019.</p>
        </form>
    </div>
</div>
`;

export async function loadEdit(ctx) {
    console.log('Edit');
    const ideaId = ctx.params.id;
    const idea = await getIdeaById(ideaId);
    console.log(idea)
    ctx.render(tempEdit(onSubmit, idea));

    async function onSubmit() {
        event.preventDefault();
        console.log('Try Create');
        const fD = getFormData(event.target);
        console.log(fD);

        if (fD.description.trim() == '' || fD.imageURL.trim() == '' || fD.title.trim() == '') {
            ctx.render(loadError('Something went wrong!'));
            setTimeout(() => {
                page.redirect(`/edit/${ctx.params.id}`);
            }, 1000);
            return
        }
        idea.description = fD.description.trim();
        idea.img = fD.imageURL.trim();
        idea.name = fD.title.trim()
        console.log(idea)
        try {

            const response = await editIdea(ideaId, idea);

            console.log(response);
            ctx.render(loadSuccess(`Idea edit successfully!`));
        } catch (err) {
            ctx.render(loadError('Something went wrong!'));

        } finally {
            setTimeout(() => {
                page.redirect('/details/' + ideaId)
            }, 1000);
        }


    }
}