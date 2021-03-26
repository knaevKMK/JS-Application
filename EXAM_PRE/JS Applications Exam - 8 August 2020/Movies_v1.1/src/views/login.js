import { getFormData, login, html, page,loadErr,loadSuccess } from '../lib.js';

const tempLogin = (onSubmit) => html`
<form @submit=${onSubmit} class="text-center border border-light p-5" action="" method="">
    <div class="form-group">
        <label for="email">Email</label>
        <input type="email" class="form-control" placeholder="Email" name="email" value="">
    </div>
    <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" placeholder="Password" name="password" value="">
    </div>

    <button type="submit" class="btn btn-primary">Login</button>
</form>`;

export function loadLogin(ctx) {
    ctx.render(tempLogin(onSubmit));

    async function onSubmit() {
        event.preventDefault();
        const fd = getFormData(event.target);
        console.log(fd);
        const email = fd.email.trim();
        const password = fd.password.trim();

        if (email == '' || password == '') {
            loadErr(`${email == '' ?'Email':''} ${password == '' ?'Password':''} reqired!`);
            return;
        }

        try {
            await login(email, password);
            loadSuccess('Login successful.');
            page.redirect('/')
        } catch (err) {
            console.log(err.message);
            loadErr('Something went wrong');
        }
    }
}