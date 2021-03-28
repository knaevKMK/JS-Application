import { lp, api } from '../lib.js';
import { note } from './elements/note.js';

//TODO attach the submit on the form
const tempCreate = (onSubmit) => lp.html `
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
            <div class="row">
                <div class="col wide">Apple</div>
                <div class="col wide">10</div>
                <div class="col wide">4.50</div>
                <div class="col">45.00</div>
                <div class="col right">
                    <a href="#">&#10006;</a>
                </div>
            </div>
            <div class="row">
                <div class="col wide">Banana</div>
                <div class="col wide">9</div>
                <div class="col wide">3.50</div>
                <div class="col">31.50</div>
                <div class="col right">
                    <a href="#">&#10006;</a>
                </div>
            </div>
        </div>
        <div class="row">
            <form id="create-entry-form">
                <div class="col wide">
                    <input name="type" placeholder="Product name">
                </div>
                <div class="col wide">
                    <input name="qty" placeholder="Quantity">
                </div>
                <div class="col wide">
                    <input name="price" placeholder="Price per Unit">
                </div>
                <div class="col">Sub-total</div>
                <div class="col">
                    <input id="addItemBtn" type="submit" value="Add" />
                </div>
            </form>
        </div>
        <div class="table-foot">
            <form id="create-receipt-form">
                <div class="col wide">
                </div>
                <div class="col wide">
                </div>
                <div class="col wide right">Total:</div>
                <div class="col">76.50</div>
                <div class="col">
                    <input id="checkoutBtn" type="submit" value="Checkout" />
                </div>
                <input type="hidden" name="receiptId" />
                <input type="hidden" name="productCount" />
                <input type="hidden" name="total" />
            </form>
        </div>
    </div>
</section>`;

export function pageCreate(ctx) {
    ctx.render(tempCreate(onSubmit));
    async function onSubmit() {

        event.preventDefault();
        const fd = api.data.getFormData(event.target);
        console.log(fd);
        //TODO check object.proto
        const title = fd.title.trim();
        const description = fd.description.trim();
        const imageUrl = fd.imageUrl.trim();

        //TODO CHECK IF & NOTE
        if (title == '' || imageUrl == '' || description == '') {
            return note('All fields required');
        }
        try {
            await api.data.createItem({ title, description, imageUrl });
            lp.page.redirect('/catalog');
        } catch (err) {
            return note(err.message)
        }
    }
}