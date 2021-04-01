import { lp } from "../lib.js";


const tempComments = () => lp.html `
`;

export async function pageComments(ctx) {
    ctx.render(tempComments());
}