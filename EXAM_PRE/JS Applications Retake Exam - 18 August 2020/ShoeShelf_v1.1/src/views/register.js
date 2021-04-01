import { lp, api } from '../lib.js';
import { note } from './elements/note.js';

//attach submit
const tempRegister = (onSubmit) => lp.html ``;

export function pageRegister(ctx) {
    ctx.render(tempRegister(onSubmit));
    async function onSubmit() {
        event.preventDefault();

        const fd = api.data.getFormData(event.target);
        console.log(fd);

        //check fields + name of input fields

        //  const email = fd.email.trim();
        const password = fd.password.trim();
        const username = fd.username.trim();
        const repeatPass = fd.repeatPass.trim();
        //   const gender = fd.gender;

        if (
            //  email == '' ||
            password == '' ||
            username == ''
            //   || gender == null
        ) {
            return window.alert('All fields required');
        }
        if (password != repeatPass) {
            return window.alert('Passwords don\`t match');
        }
        try {
            await api.data.register(
                username,
                //   email,
                password,
                //  gender
            );

            //TODO notification???

            //check redirect
            lp.page.redirect('/catalog');
        } catch (err) {
            return window.alert(err.message)
        }
    }
}