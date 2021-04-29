import { lp, api } from '../lib.js';


const tempCatalog = (data) => lp.html`
    <section id="catalog-page" class="content catalogue">
        <h1>All Articles</h1>
        ${renderData(data)}
    
    
    </section>
`;

function renderData(data) {
    //test if no data
   // data=[];
    console.log(data);
    if (data.length == 0) {
        return lp.html`<!-- No articles message -->
<h3 class="no-articles">No articles yet</h3>`;
    }
    return data.map(art => lp.html`  
    <a class="article-preview" href="/details/${art._id}">
        <article>
            <h3>Topic: <span>${art.title}</span></h3>
            <p>Category: <span>${art.category}</span></p>
        </article>
    </a>`);
}



export async function pageCatalog(ctx) {
    const data = await api.data.getAllItems();
    ctx.render(tempCatalog(data));
}