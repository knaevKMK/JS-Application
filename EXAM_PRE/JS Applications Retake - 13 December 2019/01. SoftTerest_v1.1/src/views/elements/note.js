import { lp } from "../../lib.js";
//v_1.0 multi msg
const err = (msg) => lp.html `<div id="errorBox" class="alert alert-danger" role="alert">${msg}</div>
`;
const info = (msg) => lp.html `<div id="successBox" class="alert alert-success" role="alert">${msg}
</div>`;
const loading = () => lp.html `<div id="loadingBox" class="alert alert-info" role="alert">Loading...</div>
`;

export const temp = { err, loading, info };



//todo render
//check where to render the note
//check visible in css=> display:none
export function note(msg) {
    const _note = document.querySelector('#notifications');
    lp.render(msg, _note);
    setTimeout(() => {
        lp.render(lp.html ``, _note)
    }, 3000);
}