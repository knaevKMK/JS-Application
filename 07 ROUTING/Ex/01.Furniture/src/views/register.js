import { html } from '../../node_modules/lite-html/lite-html.js';
import { register } from '../api/data.js';
const regexEmail = /[a-z0-9!#$%&' * +/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const registerTemp = (onSubmit, invalidEmail, invalidPass, invalidRePass) => html ` <div class="row space-top">
<div class="col-md-12">
    <h1>Register New User</h1>
    <p>Please fill all fields.</p>
</div>
</div>
<form @submit=${onSubmit}>
<div class="row space-top">
    <div class="col-md-4">
        <div class="form-group">
            <label class="form-control-label" for="email">${(invalidEmail ? 'Invalid ' : '')}Email</label>
            <input class=${"form-control" + (invalidEmail ? ' is-invalid' : '')}  id="email" type="text" name="email">

        </div>
        <div class="form-group">
            <label class="form-control-label" for="password">${invalidPass ? 'Invalid ' : ''}Password</label>
            <input class=${"form-control" + (invalidPass ? ' is-invalid' : '')} type="password" name="password">
        </div>
        <div class="form-group">
            <label class="form-control-label" for="rePass">${(invalidPass ? 'Invalid ' : '')}Repeat</label>
            <input class=${"form-control" + (invalidRePass ? ' is-invalid' : '')}  id="rePass" type="password" name="rePass">

        <input type="submit" class="btn btn-primary" value="Register" />
    </div>
</div>
</form>`;

export function viewRegister(ctx) {
    console.log('register');
    ctx.render(registerTemp(onSubmit, false, false, false));
    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const data = Array.from(formData.entries()).reduce((p, [k, v]) => Object.assign(p, {
            [k]: v
        }), {});
        let email = data.email.trim();
        let password = data.password.trim();
        let rePass = data.rePass.trim();

        if (email == '' || !email.match(regexEmail) || password == '') {
            ctx.render(registerTemp(onSubmit, email == '' || !email.match(regexEmail), password == '', rePass == ''));
            return;
        }
        if (password != rePass) {
            ctx.render(registerTemp(onSubmit, email == '', password != rePass, password != rePass));
            return;
        }
        try {

            const response = await register(email, password);
        } catch (err) {
            event.target.reset();
            return;
        }
        event.target.reset();
        ctx.page.redirect('/');

    }
}