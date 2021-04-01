import { html } from "../../node_modules/lit-html/lit-html.js";
import { login } from "../api/data.js";
import page from '../../node_modules/page/page.mjs';



const loginTemp = (onSubmit) => html `<main>
    <h1>Login</h1>
    <p class="form-info">Don't have account?
        <a href="./register">Register now</a> and fix that!
    </p>

    <form @submit=${onSubmit} action="">
        <div>
            <input type="email" placeholder="Email...">
        </div>

        <div>
            <input type="password" placeholder="Password...">
        </div>
        <div>
            <button>Login</button>
        </div>
    </form>
</main>`;

export function loadLogin(ctx) {

    ctx.render(loginTemp(onSubmit));

    async function onSubmit() {
        event.preventDefault();


        const email = event.target.children[0].children[0].value.trim();
        const password = event.target.children[1].children[0].value.trim();

        console.log(email + password)
        if (!email.match(/\S+@\S+\.\S+/) || password === '') {
            //  ctx.render(loginTemp(onSubmit, !email.match(/\S+@\S+\.\S+/), password === ''))
            return;
        }
        const response = await login(email, password);
        console.log(response);
        ctx.render(tempSuccess());
        setTimeout(() => {
            page.redirect('/')
        }, 1000);
    }
}

const tempSuccess = () => html `<div class="form-group" style="display: inline-flexbox; background-color:lightgreen;">
    <h3 style=" color: white; text-decoration:white underline;text-align: center;">Successful login</h3>
</div>
`;