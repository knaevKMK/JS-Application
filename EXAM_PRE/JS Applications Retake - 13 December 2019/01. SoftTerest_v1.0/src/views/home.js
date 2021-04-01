import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllIdeas } from "../api/data.js";


const tempHeader = (logged, hasIdeas) => html `
${logged
? html ` <div id="dashboard-holder">
    ${getIdeas(hasIdeas) }
    </div>`
: html  `
    <div class="container home wrapper  my-md-5 pl-md-5">
        <div class="d-md-flex flex-md-equal ">
            <div class="col-md-5">
                <img class="responsive" src="./images/01.svg" />
            </div>
            <div class="home-text col-md-7">
                <h2 class="featurette-heading">Do you wonder if your idea is good?</h2>
                <p class="lead">Join our family =)</p>
                <p class="lead">Post your ideas!</p>
                <p class="lead">Find what other people think!</p>
                <p class="lead">Comment on other people's ideas.</p>
            </div>
        </div>
        <div class="bottom text-center">
            <a href="/register" class="btn btn-secondary btn-lg " >Get Started</a>
        </div>
    </div>`
}`;
function getIdeas(ideas){

    if(!ideas){
        return html`<h1>No ideas yet! Be the first one :)</h1>`;
    }
return ideas
.sort((a,b)=>b.likes-a.likes)
.map(idea=>
  html `<div class="card overflow-hidden current-card details" style="width: 20rem; height: 18rem;">
    <div class="card-body">
        <p class="card-text">${idea.name}</p>
    </div>
    <img class="card-image" src="${idea.img}" alt="Card image cap">
    <a class="btn" href="/details/${idea._id}">Details</a>
</div>`

    );
}
export async function loadHome(ctx) {
    console.log('Home');
let data=false;
const logged = sessionStorage.getItem('email')!=null;
if(logged){
     data = await getAllIdeas();
    console.log(data)
}
    ctx.render(tempHeader(logged,data));
}