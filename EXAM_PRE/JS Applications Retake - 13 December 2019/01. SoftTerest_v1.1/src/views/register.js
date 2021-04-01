import { lp, api } from '../lib.js';
import { note, temp } from './elements/note.js';

//attach submit
const tempRegister = (onSubmit) => lp.html `
<div class="container home wrapper  my-md-5 pl-md-5">
    <div class="row-form d-md-flex flex-mb-equal ">
        <div class="col-md-4">
            <img class="responsive" src="./images/idea.png" alt="">
        </div>
        <form @submit=${onSubmit} class="form-user col-md-7" action="" method="">
            <div class="text-center mb-4">
                <h1 class="h3 mb-3 font-weight-normal">Register</h1>
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
            <div class="form-label-group">
                <label for="inputRepeatPassword">Repeat Password</label>
                <input type="password" id="inputRepeatPassword" name="repeatPassword" class="form-control"
                    placeholder="Repeat Password" required="">
            </div>
            <button class="btn btn-lg btn-dark btn-block" type="submit">Sign Up</button>
            <div class="text-center mb-4">
                <p class="alreadyUser"> Don't have account? Then just
                    <a href="/login">Sign-Up</a>!
                </p>
            </div>
            <p class="mt-5 mb-3 text-muted text-center">© SoftTerest - 2019.</p>
        </form>
    </div>
</div>`;

export function pageRegister(ctx) {
    ctx.render(tempRegister(onSubmit));



    async function onSubmit() {
        event.preventDefault();

        const fd = api.data.getFormData(event.target);
        console.log(fd);

        const password = fd.password.trim();
        const username = fd.username.trim();
        const repeatPass = fd.repeatPassword.trim();
        if (
            password == '' ||
            username == '' ||
            repeatPass == ''
        ) {
            return note(temp.err('All fields required'));
        }
        if (password != repeatPass) {
            return ote(temp.err('Passwords don\`t match'));
        }

        await api.data.register(
            username,
            password,
        );

        note(temp.info('User registration successful.'))

        //check redirect
        lp.page.redirect('/');

    }
}