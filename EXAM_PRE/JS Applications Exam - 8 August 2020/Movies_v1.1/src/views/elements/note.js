import { html, render } from '../../lib.js';




export function loadErr(msg) {
    let note = document.querySelector('.notifications');
    render(html`<p class="notification-message" id="errorBox">${msg}</p>`, note);
    _renderStyle(note);

}

export function loadSuccess(msg) {
    let note = document.querySelector('.notifications');
    render(html`<p class="notification-message" id="successBox">${msg}</p>`, note);
    note.style = "display: none;background-color:rgba(1, 131, 29, 0.541);"
    _renderStyle(note);
}
function _renderStyle(note) {
    note.style.display = 'inline-block';
    setTimeout(() => {
        note.style = '';
        note.style.display = 'none';
    }, 1500);
}