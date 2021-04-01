import { html, render } from '../../node_modules/lit-html/lit-html.js'
import { logout } from '../api/data.js';
import page from '../../node_modules/page/page.mjs';
import { getArticles as _getArticles } from '../api/data.js';


const tempHome = (data) => html `  <div class="content">
<section class="js">
    <h2>JavaScript</h2>
    <div class="articles">
        ${getArticles('JavaScript',data)}
       </div>
</section>
<section class="CSharp">
    <h2>C#</h2>
    <div class="articles">
    ${getArticles('C#',data)}
    </div>
</section>
<section class="Java">
    <h2>Java</h2>
    <div class="articles">
    ${getArticles('Java',data)}
    </div>
</section>
<section class="Pyton">
    <h2>Pyton</h2>
    <div class="articles">
    ${getArticles('Pyton',data)}
    </div>
</section>
</div>
`;
// category:
// content:
// creator-email:
// title:
function getArticles(category, data) {
    if (data.length == 0) {
        return html `<h3 class="no-articles">No articles yet</h3>`;
    }
    return data.filter(d => d.category == category).sort((a, b) => a.title.localeCompare(b.title))
        .map(d => html ` <article>
    <h3>${d.title}</h3>
    <p>${d.content.substring(0,50)+'...'}</p><a href="/details/${d._id}" class="btn details-btn">Details</a>
</article>`);
}
const tempHeader = (logged, onLogOut) => html `
<header>
    <h1><a class="home" href="/">SoftWiki</a></h1>
    <nav class="nav-buttons">
        ${logged
            ? html`<a href="/create">Create</a>
        <a @click=${onLogOut} href="javascript:void(0">Logout</a>`
            : html` <a href="/register">Register</a>
             <a href="/login">Login</a>`
            }
    </nav>
</header>
    `;
const tempFooter = () => html` <footer>My Site © Show info....</footer>`;
export async function loadHome(ctx) {
    const data = await _getArticles();
    console.log(data);
    ctx.render(tempHome(data));
}
export  function loadHeader() {
   return tempHeader(sessionStorage.getItem('email'),onLogOut);

   async function onLogOut(){
// render([loadHead(), tempLoading('Logout...'), loadFoot()], document.querySelector('body'));
    try {
        const data = await logout();
        console.log(data);
    //    render([loadHead(), tempSuccess('logout'), loadFoot()], document.querySelector('body'));
    } catch (err) {
     //   render([loadHead(), tempSuccess('!!!Bad request!!!'), loadFoot()], document.querySelector('main'));
    } finally {
        setTimeout(() => {
            page.redirect('/login')
        }, 1000);

    }
   }
}
export  function loadFooter() {
  return tempFooter();
}