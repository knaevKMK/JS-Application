import { html } from "../../node_modules/lit-html/lit-html.js";
import { getFormData } from "../api/data.js";

const tempDetails = () => html `
<div class="container home some">
    <img class="det-img" src="./images/dinner.jpg" />
    <div class="desc">
        <h2 class="display-5">Dinner Recipe</h2>
        <p class="infoType">Description:</p>
        <p class="idea-description">There are few things as comforting as heaping bowl of pasta at the end of a long
            day. With so many easy pasta recipes out there, there's something for every palate to love. That's why pasta
            makes such a quick, easy dinner for your family—it's
            likely to satisfy everyone's cravings, due to its versatility.
        </p>
        <p class="infoType">Likes:
            <large>2</large>
        </p>
        <p class="infoType">Comments:</p>
        <ul>
            <li class="comment">Jonh: I really like this idea :)</li>
            <li class="comment">No comments yet :(</li>
        </ul>
    </div>
    <div class="text-center">
        <a id="delete" class="btn detb" href="javascript:void(0)">Delete</a>
    </div>
    <form @submit=${onSubmit} class="text-center" method="" action="">
        <textarea class="textarea-det" name="newComment" id=""></textarea>
        <button type="submit" class="btn detb">Comment</button>
        <a id="like" class="btn detb" href="javascript:void(0)">Like</a>
    </form>
</div>`;

export async function loadDetails(ctx) {
    console.log('Details');
    //TODO get data + comments and inject to temp
    //TODO who is owner of idea
    ctx.render(tempDetails(onSubmit));

    async function onSubmit() {
        event.preventDefault();
        console.log('Comment');
        const fd = getFormData(event.target);

        console.log(fd);
        //TODO send comment and reload page

    }
}