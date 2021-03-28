import { lp, api } from '../lib.js';


//TODO add item proto & attach click for delete item
const tempDetail = (item, onDelete) => lp.html `
<section id="receipt-details-view">
    <h1>Receipt Details</h1>
    <div class="table">
        <div class="table-head">
            <div class="col wide">Product Name</div>
            <div class="col wide">Quantity</div>
            <div class="col wide">Price per Unit</div>
            <div class="col">Sub-total</div>
        </div>
        <div class="row">
            <div class="col wide">Apple</div>
            <div class="col wide">10</div>
            <div class="col wide">4.50</div>
            <div class="col">45.00</div>
        </div>
        <div class="row">
            <div class="col wide">Banana</div>
            <div class="col wide">9</div>
            <div class="col wide">3.50</div>
            <div class="col">31.50</div>
        </div>
    </div>
</section>`;

export async function pageDetails(ctx) {
    const itemId = ctx.params.id;
    const item = await api.data.getItemById(itemId);
    console.log(item)
    ctx.render(tempDetail(item, onDelete));

    async function onDelete() {
        await api.data.deleteItem(itemId)
            //TODO check redirect
        lp.page.redirect('')
    }
}