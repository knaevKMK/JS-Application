import { html, page, getArticleById, editArticle, getFormData } from '../library/import.js'

const tempEdit = (onSubmit, art) => html `<div class="container">

    <form @submit=${onSubmit} action="" method="">
        <fieldset>
            <legend>Edit article</legend>
            <p class="field title">
                <input type="text" name="title" id="title" placeholder="Arrays " value="${art.title}">
                <label for="title">Title:</label>
            </p>

            <p class="field category">
                <input type="text" name="category" id="category" placeholder="JavaScript" value="${art.category}">
                <label for="category">Category:</label>
            </p>
            <p class="field content">
                <textarea name="content" id="content">${art.content}</textarea>
                <label for="content">Content:</label>
            </p>

            <p class="field submit">
                <button class="btn submit" type="submit">Edit</button>
            </p>

        </fieldset>
    </form>
</div>`;

export async function loadEdit(ctx) {
    const artId = ctx.params.id;
    let art = {};
    try {
        art = await getArticleById(artId);
        console.log(art)

    } catch (err) { console.log(err.message); }
    ctx.render(tempEdit(onSubmit, art));


    async function onSubmit() {
        event.preventDefault();
        const fd = getFormData(event.target);
        console.log(fd);

        fd.title = fd.title.trim();
        fd.content = fd.content.trim();

        if (fd.title == '' || fd.content == '') {
            return;
        }

        fd['creator-email'] = sessionStorage.getItem('email')

        try {
            await editArticle(artId, fd)
            page.redirect('/')
        } catch (err) {
            console.log(err.message)
        }
    }

}