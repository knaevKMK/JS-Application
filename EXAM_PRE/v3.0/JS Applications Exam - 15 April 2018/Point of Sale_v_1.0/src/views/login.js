import { lp, api } from '../lib.js';
import { note } from './elements/note.js';


//TODO attach submit
const tempLogin = (onSubmit) => lp.html ``;



export function pageLogin(ctx) {
    ctx.render(tempLogin(onSubmit));


    async function onSubmit() {
        event.preventDefault();
        const fd = api.data.getFormData(event.target);
        console.log(fd);
        // Check fields name
        const email = fd.email.trim();
        const password = fd.password.trim();

        if (email == '' || password == '') {
            note('All fields required');
            return;
        }
        try {
            await api.data.login(email, password);
            //check redirect
            lp.page.redirect('/catalog');
        } catch (err) {
            note(err.message);
            return
        }
    }
}