import { lp } from "../../lib.js";



const loading = () => lp.html `
<div id="loadingBox" class="notification" style="display: none;"><span>Loading …</span></div>
    `;
const info = (msg) => lp.html `
<div id="infoBox" class="notification"><span>${msg}</span></div>
    `;
const err = (msg) => lp.html `<div id="errorBox" class="notification"><span>${msg}</span></div>
    `;
export function note(msg) {
    const _note = document.querySelector('#notifications');

    lp.render(msg, _note);

    setTimeout(() => {
        lp.render(lp.html ``, _note)
    }, 3000);
}

export const temp = { loading, info, err };