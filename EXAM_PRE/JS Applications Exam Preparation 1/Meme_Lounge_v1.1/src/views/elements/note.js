import { lp } from "../../lib.js";
//v_1.0 multi msg
// const err = (msg) => lp.html ``;
// const info = (msg) => lp.html ``;
// const loading = () => lp.html ``;

// export const temp = { err, loading, info };





//v_1.1 single msg
const tempNote = (msg) => lp.html `
    <div id="errorBox" class="notification">
        <span>${msg}</span>
    </div>`;

//todo render
//check where to render the note
//check visible in css=> display:none
export function note(msg) {
    const _note = document.querySelector('#notifications');
    lp.render(tempNote(msg), _note);
    setTimeout(() => {
        lp.render(lp.html ``, _note)
    }, 3000);
}