import { lp, api } from '../lib.js';


//TODO add item proto & attach click for delete item
const tempDetail = (item, onDelete) => lp.html ``;

export async function pageDetails(ctx) {
    const itemId = ctx.params.id;
    const item = await api.data.getItemById(itemId)
    ctx.render(tempDetail(item, onDelete));

    async function onDelete() {
        await api.data.deleteItem(itemId)
            //TODO check redirect
        lp.page.redirect('')
    }
}