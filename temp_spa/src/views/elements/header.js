import { lp, api } from "../../lib.js";

const tempHeader = (email, onLogout) => lp.html ``;

export function loadHeader() {
    const email = sessionStorage.getItem('email');


    async function onLogout() {
        await api.data.logout();
        lp.page.redirect('/');
    }


    return tempHeader(email, onLogout);
}