import { lp, api } from '../lib.js';

const tempCatalog = (data) => lp.html `
<section id="all-receipt-view">
    <h1>All Receipts</h1>
    <div class="table">
        <div class="table-head">
            <div class="col wide">Creation Date</div>
            <div class="col wide">Items</div>
            <div class="col">Total</div>
            <div class="col">Actions</div>
        </div>
        ${renderData(data)}
        <div class="table-foot">
            <form id="create-receipt-form">
                <div class="col wide">
                </div>
                <div class="col wide right">Total:</div>
                <div class="col">${getTotal(data)}</div>
                <div class="col">
                </div>
            </form>
        </div>
    </div>
</section>
`;

function getTotal(data) {
    let total = 0;
    data.forEach(i => total += (i.price * i.qty))
    return total;
}

function renderData(data) {
    console.log(data);
    if (data.length == 0) {
        return lp.html ``;
    }
    return data.map(m => lp.html `<div class="row">
    <div class="col wide">${m.date}</div>
    <div class="col wide">${m.productCount}</div>
    <div class="col">${m.total}</div>
    <div class="col">
        <a href="/details/${m._id}">Details</a>
    </div>
</div>`);
}
export async function pageCatalog(ctx) {

    const data = await api.data.getAllItems();
    console.log(data);
    ctx.render(tempCatalog(data));
}