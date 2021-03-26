import { createArticle, getFormData, html, page } from '../library/import.js'

const tempCreate = (onSubmit) => html `<div class="container">
    <form @submit=${onSubmit} action="" method="">
        <fieldset>
            <legend>Create article</legend>
            <p class="field title">
                <input type="text" id="title" name="title" placeholder="Arrays">
                <label for="title">Title:</label>
            </p>

            <p class="field category">
                <input type="text" id="category" name="category" placeholder="JavaScript">
                <label for="category">Category:</label>
            </p>
            <p class="field content">
                <textarea name="content" id="content"></textarea>
                <label for="content">Content:</label>
            </p>

            <p class="field submit">
                <button class="btn submit" type="submit">Create</button>
            </p>

        </fieldset>
    </form>
</div>`;


// category: ""
// content: ""
// title: ""

// category: "Pyton"
// content:
// creator-email: "peter@email.com"
// title: "Gjango"
// _id:
export function loadCreate(ctx) {
    ctx.render(tempCreate(onSubmit));
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
            await createArticle(fd)
            page.redirect('/')
        } catch (err) {
            console.log(err.message)
        }
    }
}