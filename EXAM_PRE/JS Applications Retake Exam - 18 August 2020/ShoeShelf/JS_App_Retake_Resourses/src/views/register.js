import { html } from "../../node_modules/lit-html/lit-html.js";
import { register } from "../api/data.js";
import page from '../../node_modules/page/page.mjs';



const registerTemp = (onSubmit, email, password, rePassword) => html `<main>
    <h1>Register</h1>
    <p class="form-info">Already registered?
        <a href="/login">Login now</a> and have some fun!
    </p>


    <form @submit=${onSubmit} action="">
        <div>
            <input type="email" placeholder="Email...">
        </div>
        <div>
            <input type="password" placeholder="Password">
        </div>
        <div>
            <input type="password" placeholder="Re-password">
        </div>
        <div>
            <p class="message"> ${email||password||rePassword
    ? `${email?'Email ':''} ${password?'Password ':''} ${rePassword?'Re-password ':''} not match`
     :''     }</p>
            <button>Register</button>
        </div>
    </form>
</main>`;

export function loadRegister(ctx) {

    ctx.render(registerTemp(onSubmit));

    async function onSubmit() {
        event.preventDefault();


        const email = event.target.children[0].children[0].value.trim();
        const password = event.target.children[1].children[0].value.trim();
        const rePassword = event.target.children[2].children[0].value.trim();
        console.log(email + password + rePassword)
        if (!email.match(/\S+@\S+\.\S+/) ||
            password === '' || rePassword === '') {
            ctx.render(registerTemp(onSubmit, !email.match(/\S+@\S+\.\S+/), password === '', rePassword === ''))
            return;
        }
        if ( password !==  rePassword) {
            ctx.render(registerTemp(onSubmit, false, true ,true))
            return;
        }
        console.log(email + password + rePassword)
        const response = await register(email,password);
        console.log(response);
        ctx.render(tempSuccess());
        setTimeout(() => {
            page.redirect('/')
        }, 1000);
    }

}
const tempSuccess = () => html `<div class="form-group" style="display: inline-flexbox; background-color:lightgreen;">
    <h3 style=" color: white; text-decoration:white underline;text-align: center;">Successful registration</h3>
</div>
`;