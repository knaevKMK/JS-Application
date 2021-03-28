import { lp, api } from '../lib.js';
import { note, temp } from './elements/note.js';

//TODO attach the submit on the form
const tempCreate = (data, onSubmit, onDelete, onReload) => lp.html `
<section id="create-receipt-view">
    <h1>Create Receipt</h1>
    <div class="table">
        <div class="table-head">
            <div class="col wide">Product Name</div>
            <div class="col wide">Quantity</div>
            <div class="col wide">Price per Unit</div>
            <div class="col">Sub-total</div>
            <div class="col">Action</div>
        </div>
        <div id="active-entries">
            ${renderData(data, onDelete)}
        </div>
        <div class="row">
            <form @submit=${onSubmit}id="create-entry-form">
                <div class="col wide">
                    <input name="type" type="text" placeholder="Product name">
                </div>
                <div class="col wide">
                    <input name="qty" type="number" placeholder="Quantity">
                </div>
                <div class="col wide">
                    <input name="price" type="number" placeholder="Price per Unit">
                </div>
                <div class="col">Sub-total</div>
                <div class="col">
                    <input id="addItemBtn" type="submit" value="Add" />
                </div>
            </form>
        </div>
        <div class="table-foot">
            ${form_create_receipt("false",data, onReload)}
        </div>
    </div>
</section>`;
const form_create_receipt = (hidden, data, onReload) => lp.html `
<form @submit=${onReload} id="create-receipt-form">
                <div class="col wide">
                </div>
                <div class="col wide">
                </div>
                <div class="col wide right">Total:</div>
                <div class="col">${getTotal(data)}</div>
                <div id="hid" class="col">
                ${hidden!= "false"
                     ? lp.html`<input type="hidden" name="receiptId"  value="${0}" />
                                <input type="text" name="productCount" disabled=true value="Quantity: ${hidden.qty}" />
                                <input type="text" name="total" disabled=true value="Sub-total: ${hidden.total}" />`
                          :''
                }
                    <input  href="" id="checkoutBtn" type="submit" value="Checkout" />
                </div>


            </form>`;
function getTotal(data) {
    let total = 0;
    data.forEach(i => total += (i.price * i.qty))

    return total;
}

function renderData(data, onDelete) {
    if (data.length == 0) {
        return '';
    }
    return data.map(m => lp.html `
<div class="row">
    <div class="col wide">${m.type}</div>
    <div class="col wide">${m.qty}</div>
    <div class="col wide">${m.price}</div>
    <div class="col wide">${(m.price*m.qty).toFixed(2)}</div>
    <div class="col right">
        <a id=${m._id} @click=${onDelete} href="javascript:void(0)">&#10006;</a>
    </div>
</div>`);
}

export async function pageCreate(ctx) {
    let   receiptId= ctx.params.id;
    console.log(receiptId)
    if(! receiptId){
        const receipt = await api.data.afterLogin();
        receiptId=(receipt._id);
    }

    const _data = await api.data.getEntriesByReceiptId(receiptId);
    ctx.render(tempCreate(_data, onSubmit, onDelete, onReload));

    async function onDelete() {
        await api.data.deleteEntry(event.target.id)
        note(temp.info("Entry removed"));

        lp.page.redirect(`/edit/${receiptId}`)
    }

    async function onReload() {
        event.preventDefault();
        console.log("CheckOut");
        let qty=0;
        let total=0;
        _data.forEach(d=>{
            qty+=d.qty;
            total+=(d.qty*d.price);
        });
        await api.data.editItem(receiptId,{
            active: false,
            productCount: 0,
            total: 0
        })
        note(temp.info('Receipt checked out'));
            lp.page.redirect(`/catalog`);
    }
    async function onSubmit() {
        event.preventDefault();
        const form = event.target;
        const fd = api.data.getFormData(event.target);
        console.log(fd);

        const type = fd.type.trim();
        const qty = Number(fd.qty.trim());
        const price = Number(fd.price.trim());

        //TODO CHECK IF & NOTE
        if (type == '' || qty == '' || price <= 0) {
            return note(temp.err('All fields required'));
        }


        try {
            await api.data.createEntry({ type, qty, price, receiptId });
            note(temp.info('Entry added'));
            lp.page.redirect(`/edit/${receiptId}`)

            //const total=qty*price;
         //   lp.render(form_create_receipt({qty,total},_data,onReload),document.querySelector('#create-receipt-form'));

            form.reset();
        } catch (err) {
            return note(temp.err(err.message));
        }
    }
}