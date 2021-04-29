import { lp, api } from '../lib.js';


const tempEdit = (item, onSubmit) => lp.html `
  <section id="edit-page" class="content">
            <h1>Edit Article</h1>

            <form @submit=${onSubmit} id="edit" action="" method="">
                <fieldset>
                    <p class="field title">
                        <label for="title">Title:</label>
                        <input type="text" name="title" id="title" value="${item.title}" placeholder="Enter article title">
                    </p>

                    <p class="field category">
                        <label for="category">Category:</label>
                        <input type="text" name="category" id="category" value="${item.category}" placeholder="Enter article category">
                    </p>
                    <p class="field">
                        <label for="content">Content:</label>
                        <textarea name="content" id="content">${item.content}</textarea>
                    </p>

                    <p class="field submit">
                        <input class="btn submit" type="submit" value="Save Changes">
                    </p>

                </fieldset>
            </form>
        </section>`;

export async function pageEdit(ctx) {
    const itemId = ctx.params.id;
    const item = await api.data.getItemById(itemId)
    ctx.render(tempEdit(item, onSubmit));


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
      
           await api.data.updateItem(itemId,{ title, content, category });

     
            lp.page.redirect('/details/'+itemId);
       
    }
}