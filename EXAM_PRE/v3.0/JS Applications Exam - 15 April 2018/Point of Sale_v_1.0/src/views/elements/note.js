import { lp } from "../../lib.js";



const tempNote = (msg) => lp.html `
    <div id="errorBox" class="notification">
        <span>${msg}</span>
    </div>
    </section>`;
export function note(msg) {
    const _note = document.querySelector('#notifications');
    console.log('NOTE: ' + msg)
    console.log(_note)
    lp.render(tempNote(msg), _note);

    setTimeout(() => {
        lp.render(lp.html ``, _note)
    }, 3000);
}