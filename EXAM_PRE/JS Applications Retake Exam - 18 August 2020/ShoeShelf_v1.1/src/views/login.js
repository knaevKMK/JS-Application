import { lp, api } from '../lib.js';
import { note } from './elements/note.js';


//TODO attach submit & redirect for links as login
//check notifications if have r26 r31 35
const tempLogin = (onSubmit) => lp.html ``;



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
        try {
            await api.data.login(email, password);
            //TODO notifications

            //check redirect home or catalog(all Items)
            lp.page.redirect('/');
        } catch (err) {
            return window.alert(err.message);
        }
    }
}