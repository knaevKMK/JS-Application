import { getFormData, html,register,page } from '../lib.js';

const tempRegister = (onSubmit) => html`<form @submit=${onSubmit} class="text-center border border-light p-5" action="#" method="post">
    <div class="form-group">
        <label for="email">Email</label>
        <input type="email" class="form-control" placeholder="Email" name="email" value="">
    </div>
    <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" placeholder="Password" name="password" value="">
    </div>

    <div class="form-group">
        <label for="repeatPassword">Repeat Password</label>
        <input type="password" class="form-control" placeholder="Repeat-Password" name="repeatPassword" value="">
    </div>

    <button type="submit" class="btn btn-primary">Register</button>
</form>`;
const emailRegex= /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export function loadRegister(ctx) {

    ctx.render(tempRegister(onSubmit));
    async function onSubmit() {
        event.preventDefault();
        const fd = getFormData(event.target);
        console.log(fd);
        const email = fd.email.trim();
        const password = fd.password.trim();
        const rePass = fd.repeatPassword.trim();
        if (!email.match(emailRegex) || password==''||rePass==''){
            loadErr(`${email == '' ?'Email':''} ${password == '' ?'Password':''} ${rePass == '' ?'Re-Password':''} reqired!`);
            return;
        }
        if(password!=rePass){
            loadErr('Passwords not match')
            return;
        }
        try{
            await register(email,password);
            loadSuccess('Register successful.');
            page.redirect('/')
        }catch(err){
            console.log(err.message);
            loadErr('Something went wrong');
        }
    }
}