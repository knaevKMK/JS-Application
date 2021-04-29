import { api, lp } from '../lib.js';

const tempHome = (data) => lp.html`
<section id="home-page" class="content">
    <h1>Recent Articles</h1>
    <section class="recent js">
        <h2>JavaScript</h2>
        ${renderData(data,'JavaScript')}
    </section>
    <section class="recent csharp">
        <h2>C#</h2>
       ${renderData(data,'C#')}
    </section>
    <section class="recent java">
        <h2>Java</h2>
        ${renderData(data,'Java')}
    </section>
    <section class="recent python">
        <h2>Python</h2>
        ${renderData(data,'Python')}
    </section>
</section>`;

function renderData(data,type) {
    
    console.log(data);
const art = data.find(a=>a.category==type);
console.log(art);
    if (art==undefined) {
        return lp.html`<h3 class="no-articles">No articles yet</h3>`;
    }
    return lp.html`  
    <article>
        <h3>${art.title}</h3>
        <p>${art.content}</p>
        <a href="/details/${art._id}" class="btn details-btn">Details</a>
    </article>
   `;
}

export async function pageHome(ctx) {
    const data =await api.data.getItemByCategory()
    
    ctx.render(tempHome(data));
}