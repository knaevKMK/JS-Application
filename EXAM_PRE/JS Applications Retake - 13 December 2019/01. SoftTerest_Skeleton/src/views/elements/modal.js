import { html } from "../../../node_modules/lit-html/lit-html.js";

const tempLoading = () => html `
<div id="notifications">
    <div style="display: block;" id="loadingBox" class="alert alert-info" role="alert">Loading...</div>
</div>
`;
const tempSuccess = (message) => html `
<div id="notifications">
    <div style="display: block;" id="successBox" class="alert alert-success" role="alert">${message}</div>
</div>`;
const tempError = (message) => html `
<div id="notifications">
    <div style="display: block;" id="errorBox" class="alert alert-danger" role="alert">${message}</div>
</div>`;

export function loadSuccess(msg) {
    return tempSuccess(msg);
}
export function loadLoading() {
    return tempLoading();
}
export function loadError(msg) {
    return tempError(msg);
}