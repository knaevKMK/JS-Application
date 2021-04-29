import { api, lp } from "../lib.js";


const tempSearch = (onSearch) => lp.html`
<section id="search-page" class="content">
    <h1>Search</h1>
    <form @submit=${onSearch} id="search-form">
        <p class="field search">
            <input type="text" placeholder="Search by article title" name="search">
        </p>
        <p class="field submit">
            <input class="btn submit" type="submit" value="Search">
        </p>
    </form>
    <div class="search-container">

    </div>
</section>`;

function renderResult(result) {
    console.log(result);

    if (result.length == 0) {
        return lp.html`<h3 class="no-articles">No matching articles</h3>`;
    }

    return result.map(r => lp.html`
<a class="article-preview" href="/details/${r._id}">
    <article>
        <h3>Topic: <span>${r.title}</span></h3>
        <p>Category: <span>${r.category}</span></p>
    </article>
</a>
`);

}
export function pageSearch(ctx) {

    ctx.render(tempSearch(onSearch));

    async function onSearch() {
        event.preventDefault();

        const form = event.target;
        const fd = api.data.getFormData(form);
        console.log(fd);
        const query = fd['search'].trim();
        console.log(query);

        const result = await api.data.search(query);
        lp.render(renderResult(result),document.querySelector('.search-container'))
        form.reset();
    }
}