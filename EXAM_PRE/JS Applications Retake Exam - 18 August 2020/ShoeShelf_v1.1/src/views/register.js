import { lp, api } from '../lib.js';

//attach submit
const tempRegister = (onSubmit) => lp.html ` <h1>Register</h1>
<p class="form-info">Already registered?
    <a href="/login">Login now</a> and have some fun!
</p>

<form @submit=${onSubmit} action="">
    <div>
        <input type="email" name="email" placeholder="Email...">
    </div>
    <div>
        <input type="password"  name="password" placeholder="Password">
    </div>
    <div>
        <input type="password" name="repeatPass" placeholder="Re-password">
    </div>
    <div>
        <p class="message"></p>
        <button>Register</button>
    </div>
</form>`;

export function pageRegister(ctx) {
    ctx.render(tempRegister(onSubmit));
    async function onSubmit() {
        event.preventDefault();

        const fd = api.data.getFormData(event.target);
        console.log(fd);

       
        const password = fd.password.trim();
        const email = fd.email.trim();
        const repeatPass = fd.repeatPass.trim();
     
        if (
            password == '' ||
            email == ''
                 ) {
            return window.alert('All fields required');
        }
        if (password != repeatPass) {
            return window.alert('Passwords don\`t match');
        }
     
            await api.data.register(
                email,
                          password,
                          );

            //TODO notification???

            //check redirect
            lp.page.redirect('/');
      
    }
}