import { lp, api } from '../lib.js';
import { note, temp } from './elements/note.js';


//TODO attach submit & redirect for links as login
//check notifications if have r26 r31 35
const tempLogin = (onSubmit) => lp.html `
<div class="container home wrapper  my-md-5 pl-md-5">
    <div class="row-form d-md-flex flex-mb-equal ">
        <div class="col-md-4">
            <img class="responsive" src="./images/idea.png" alt="">
        </div>
        <form @submit=${onSubmit} class="form-user col-md-7" action="" method="">
            <div class="text-center mb-4">
                <h1 class="h3 mb-3 font-weight-normal">Login</h1>
            </div>
            <div class="form-label-group">
                <label for="inputUsername">Username</label>
                <input type="text" id="inputUsername" name="username" class="form-control" placeholder="Username"
                    required="" autofocus="">
            </div>
            <div class="form-label-group">
                <label for="inputPassword">Password</label>
                <input type="password" id="inputPassword" name="password" class="form-control" placeholder="Password"
                    required="">
            </div>
            <div class="text-center mb-4 text-center">
                <button class="btn btn-lg btn-dark btn-block" type="submit">Sign In</button>
                <p class="alreadyUser"> Don't have account? Then just
                    <a href="/register">Sign-Up</a>!
                </p>
            </div>
            <p class="mt-5 mb-3 text-muted text-center">© SoftTerest - 2019.</p>
        </form>
    </div>
</div>`;



export function pageLogin(ctx) {
    ctx.render(tempLogin(onSubmit));


    async function onSubmit() {
        event.preventDefault();
        const fd = api.data.getFormData(event.target);
        console.log(fd);

        // Check fields name USERNAME or PASSWORD rename with F2

        const username = fd.username.trim();
        const password = fd.password.trim();

        if (username == '' || password == '') {
            return note(temp.err('All fields required'));
        }

        await api.data.login(username, password);
        note(temp.info('Login successful.'));

        //check redirect home or catalog(all Items)
        lp.page.redirect('/');
    }
}