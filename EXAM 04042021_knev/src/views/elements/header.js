import { _user } from "../../api/utility.js";
import { lp, api } from "../../lib.js";


// Some elements will visible if(user!=undefined)
// user will undefined or parse JSON object (what server response=> look pint utility r11)
const tempHeader = (user, onLogout) => lp.html ``;






export function loadHeader() {
    const user = _user.getUserData();

    async function onLogout() {
        await api.data.logout();
        //where to re-direct?
        lp.page.redirect('/');
    }

    return tempHeader(user, onLogout);
}