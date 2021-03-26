import { html, getArticles } from '../library/import.js'


const tempHome = (arts) => html `<div class="content">
    <section class="js">
        <h2>JavaScript</h2>
        <div class="articles">
            ${renderArt(arts, 'JavaScript')}
        </div>
    </section>
    <section class="CSharp">
        <h2>C#</h2>
        <div class="articles">
            ${renderArt(arts, 'C#')}
        </div>
    </section>
    <section class="Java">
        <h2>Java</h2>
        <div class="articles">
            ${renderArt(arts, 'Java')}
        </div>
    </section>
    <section class="Pyton">
        <h2>Pyton</h2>
        <div class="articles">
            ${renderArt(arts, 'Pyton')}
        </div>
    </section>
</div>`;

function renderArt(arts, section) {
    let _temp = arts
        .filter(a => a.category == section)
    if (_temp.length == 0) {
        return html `<h3 class="no-articles">No articles yet</h3>`;
    }
    return _temp
        .sort((a, b) => a.title.localeCompare(b.title))
        .map(a => html `<article>
    <h3>${a.title}</h3>
    <p>${a.content}</p>
    <a href="/details/${a._id}" class="btn details-btn">Details</a>
</article>`);
}
export async function loadHome(ctx) {
    const arts = await getArticles();
    console.log(arts)
    ctx.render(tempHome(arts));
}