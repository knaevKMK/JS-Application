import { lp, _note } from "../../lib.js";



const loading = () => lp.html `
    <div id="loadingBox" class="notification">
        <span>Loading …</span>
    </div>`;
const info = (msg) => lp.html `
        <div id="infoBox" class="notification">
            <span>${msg}</span>
        </div>`;
const err = (msg) => lp.html `
        <div id="errorBox" class="notification">
            <span>${msg}</span>
        </div>`;


export function note(temp) {
    lp.render(temp, _note);

    setTimeout(() => {
        lp.render(lp.html ``, _note)
    }, 3000);
}

export const temp = { loading, info, err };