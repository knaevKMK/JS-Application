import { html } from "../../../node_modules/lit-html/lit-html.js";



const tempFooter = () => html `
<footer class="footer">
    <div class="container-footer">
        <span>© We cherish your ideas! Share them with others!</span>
    </div>
</footer>`;

export function loadFooter() {
    return tempFooter();
}