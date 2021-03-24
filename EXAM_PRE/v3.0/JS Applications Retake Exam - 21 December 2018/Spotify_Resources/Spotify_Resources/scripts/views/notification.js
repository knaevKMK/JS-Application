import { html, render } from '../../node_modules/lit-html/lit-html.js';
const notification = document.querySelector('#notifications');


export function loadNotification(msg) {
    //   notification.style.display = 'inline-block'
    render(msg, notification);
    // setTimeout(() => {
    //     render(html ``, notification)
    // }, 3000);

}

// onClick="onClose()
//<script>
// function onClose(event) {
//     event.target.remove();
//  }
// </script>
export const tempLoading = () => html `
    <div id="loadingBox" class="notification"">
            <span>Loading …</span>
        </div>`;

export const tempInfo = (text) => html `
<div id="infoBox" class="notification">
    <span>${text}</span>
</div>`;

export const tempError = (msg) => html `<div id="errorBox" class="notification">
    <span>${msg}</span>
</div>
`;