import { lp, api } from '../lib.js';


//TODO add item proto & attach click for delete item
const tempDetail = (item) => lp.html `
<section id="receipt-details-view">
    <h1>Receipt Details</h1>
    <div class="table">
        <div class="table-head">
            <div class="col wide">Product Name</div>
            <div class="col wide">Quantity</div>
            <div class="col wide">Price per Unit</div>
            <div class="col">Sub-total</div>
        </div>
        ${renderData(item)}

    </div>
</section>`;

function renderData(data) {
    console.log(data);
    if (data.length == 0) {
        return '';
    }
    return data.map(m => lp.html `
<div class="row">
    <div class="col wide">${m.type}</div>
    <div class="col wide">${m.qty}</div>
    <div class="col wide">${m.price}</div>
    <div class="col">${m.price * m.qty}</div>
</div>`);
}
export async function pageDetails(ctx) {
    const itemId = ctx.params.id;
    sessionStorage.setItem('receipt', itemId)
    const item = await api.data.getEntriesByReceiptId(itemId);
    console.log(item)
    ctx.render(tempDetail(item));


}