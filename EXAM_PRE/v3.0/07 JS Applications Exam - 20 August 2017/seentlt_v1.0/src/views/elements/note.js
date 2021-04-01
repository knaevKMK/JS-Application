import { lp } from "../../lib.js";


const err = (msg) => lp.html `<div id="errorBox" class="notification"><span>${msg}</span></div>`;
const info = (msg) => lp.html `<div id="infoBox" class="notification"><span>${msg}</span></div>`;
const loading = () => lp.html `<div id="loadingBox" class="notification"><span>Loading …</span></div>`;

export const temp = { err, loading, info };


export function note(msg) {
    const _note = document.querySelector('#notifications');
    lp.render(msg, _note);
    setTimeout(() => {
        lp.render(lp.html ``, _note)
    }, 3000);
}