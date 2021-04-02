import { lp, api } from '../lib.js';


//TODO attach submit & redirect for links as login
//check notifications if have r26 r31 35
const tempLogin = (onSubmit) => lp.html `  <h1>Login</h1>
<p class="form-info">Don't have account?
    <a href="register">Register now</a> and fix that!
</p>
<form @submit=${onSubmit} action="">
    <div>
        <input type="email" name="email" placeholder="Email...">
    </div>

    <div>
        <input type="password" name="password" placeholder="Password...">
    </div>
    <div> 
        <button>Login</button>
    </div>
</form>`;



export function pageLogin(ctx) {
    ctx.render(tempLogin(onSubmit));


    async function onSubmit() {
        event.preventDefault();
        const fd = api.data.getFormData(event.target);
        console.log(fd);

        // Check fields name USERNAME or PASSWORD rename with F2

        const email = fd.email.trim();
        const password = fd.password.trim();

        if (email == '' || password == '') {
            return window.alert('All fields required');
        }
      
            await api.data.login(email, password);
            //TODO notifications
            //check redirect home or catalog(all Items)
            lp.page.redirect('/');
      
    }
}