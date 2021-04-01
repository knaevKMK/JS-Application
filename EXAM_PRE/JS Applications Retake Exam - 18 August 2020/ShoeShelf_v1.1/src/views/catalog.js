import { lp, api } from '../lib.js';
// also as ALL _ ITEMS
const tempCatalog = (data) => lp.html `
`;

function renderData(data) {
    console.log(data);
    if (data.length == 0) {
        return lp.html ``;
    }
    return data.map(m => lp.html ``);
}
export async function pageCatalog(ctx) {
    const data = await api.data.getAllItems();
    ctx.render(tempCatalog(data));
}