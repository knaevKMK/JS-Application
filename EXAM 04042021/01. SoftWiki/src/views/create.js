import { lp, api } from '../lib.js';


const tempCreate = (onSubmit) => lp.html `
  <section id="create-page" class="content">
            <h1>Create Article</h1>

            <form @submit=${onSubmit} id="create" action="" method="">
                <fieldset>
                    <p class="field title">
                        <label for="create-title">Title:</label>
                        <input type="text" id="create-title" name="title" placeholder="Enter article title">
                    </p>

                    <p class="field category">
                        <label for="create-category">Category:</label>
                        <input type="text" id="create-category" name="category" placeholder="Enter article category">
                    </p>
                    <p class="field">
                        <label for="create-content">Content:</label>
                        <textarea name="content" id="create-content"></textarea>
                    </p>

                    <p class="field submit">
                        <input class="btn submit" type="submit" value="Create">
                    </p>

                </fieldset>
            </form>
        </section>`;

export function pageCreate(ctx) {
    ctx.render(tempCreate(onSubmit));
    async function onSubmit() {

        event.preventDefault();
        const fd = api.data.getFormData(event.target);
        console.log(fd);
      
        const title = fd.title.trim();
        const content = fd.content.trim();
        const category = fd.category.trim();

        if (title == '' || 
        (category != 'JavaScript' &&category != 'Java'&& category != 'C#'&& category != 'Python' ) 
        || content == '') {
            return window.alert('All fields required');
        }
      
           await api.data.createItem({ title, content, category });

     
            lp.page.redirect('/');
       
    }
}