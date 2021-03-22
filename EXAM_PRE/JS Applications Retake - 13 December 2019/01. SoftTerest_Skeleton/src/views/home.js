import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllIdeas } from "../api/data.js";


const tempHeader = (logged, hasIdeas) => html `
${logged
? html ` <div id="dashboard-holder">
    ${hasIdeas
        ? html` <div class="card overflow-hidden current-card details" style="width: 20rem; height: 18rem;">
                <div class="card-body">
                        <p class="card-text">Dinner Recipe</p>
                    </div>
                    <img class="card-image" src="./images/dinner.jpg" alt="Card image cap">
                    <a class="btn" href="/details">Details</a>
                </div>
                <div class="card overflow-hidden current-card details" style="width: 20rem; height: 18rem;">
                    <div class="card-body">
                        <p class="card-text">4 easy DIY ideas to try!</p>
                    </div>
                    <img class="card-image" src="./images/brightideacropped.jpg" alt="Card image cap">
                    <a class="btn" href="/details">Details</a>
                </div>
                <div class="card overflow-hidden current-card details" style="width: 20rem; height: 18rem;">
                    <div class="card-body">
                        <p class="card-text">Best Pilates Workouts to Do at Home</p>
                    </div>
                    <img class="card-image" src="./images/best-pilates-youtube-workouts-2__medium_4x3.jpg" alt="Card image cap">
                    <a class="btn" href="/details">Details</a>
            </div>`
        : html`   <h1>No ideas yet! Be the first one :)</h1>`}
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

export async function loadHome(ctx) {
    console.log('Home');

const logged = sessionStorage.getItem('email')!=null;
if(logged){
    const data = await getAllIdeas();
    console.log(data)
}
    ctx.render(tempHeader(logged,true));
}