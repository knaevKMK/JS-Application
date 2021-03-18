import page from '../../node_modules/page/page.mjs'
import { html } from '../../node_modules/lite-html/lite-html.js';
import { editRecord, getFurnitureById } from '../api/data.js';


const editTemp = async(item, onSubmit, description, img, make, model, price, year) => html ` <div class="row space-top">
<div class="col-md-12">
    <h1>Edit Furniture</h1>
    <p>Please fill all fields.</p>
</div>
</div>
<form @submit=${onSubmit}>
<div class="row space-top">
    <div class="col-md-4">
        <div class="form-group">
            <label class="form-control-label" for="new-make">Make${make ? ' must be at least 4 symbols long' : ''}</label>
            <input class=${`form-control ${make ? 'is-invalid' : "valid"}`} id="new-make" type="text" name="make" value=${item.make}>
        </div>
        <div class="form-group has-success">
             <label class="form-control-label" for="new-model">Model${model ? ' must be at least 4 symbols long' : ''}</label>
            <input class=${`form-control ${model ? 'is-invalid' : "valid"}`} id="new-model" type="text" name="model" value=${item.model}>
        </div>
        <div class="form-group has-danger">
        <label class="form-control-label" for="new-year">Year${year ? ' must be between 1950 and 2050' : ''}</label>
            <input class=${`form-control ${year ? 'is-invalid' : "valid"}`} id="new-year" type="number" name="year" value=${item.year}>
        </div>
        <div class="form-group">
        <label class="form-control-label" for="new-description">Description${description ? ' must be more than 10 symbols' : ''}</label>
            <input class=${`form-control ${description ? 'is-invalid' : "valid"}`} id="new-description" type="text" name="description" value=${item.description}>
        </div>
    </div>
    <div class="col-md-4">
        <div class="form-group">
        <label class="form-control-label" for="new-price">Price${price ? ' must be a positive number' : ''}</label>
            <input class=${`form-control ${price ? 'is-invalid' : "valid"}`} id="new-price" type="number" name="price" value=${item.price}>
        </div>
        <div class="form-group">
        <label class="form-control-label" for="new-image">Image${img ? ' URL is required' : ''}</label>
            <input class=${`form-control ${img ? 'is-invalid' : "valid"}`} id="new-image" type="text" name="img" value=${item.img}>
        </div>
        <div class="form-group">
            <label class="form-control-label" for="new-material">Material (optional)</label>
            <input class="form-control" id="new-material" type="text" name="material" value=${item.material}>
        </div>
        <input type="submit" class="btn btn-info" value="Edit" />
    </div>
</div>
</form>`;

export async function viewEdit(ctx) {
    console.log('edit');
    const itemId = (ctx.params.id);
    const data = await getFurnitureById(itemId);
    console.log(data)
    ctx.render(editTemp(data, onSubmit));

    async function onSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const _data = Array.from(formData.entries()).reduce((p, [k, v]) => Object.assign(p, {
            [k]: v
        }), {})
        console.log(_data)
        if (_data.description.length < 10 ||
            _data.img.trim() == "" ||
            _data.make.length < 4 ||
            _data.model.length < 4 ||
            Number(_data.price) < 1 ||
            _data.year < 1950 ||
            _data.year > 2050
        ) {
            ctx.render(editTemp(data, onSubmit,
                _data.description.length < 10,
                _data.img.trim() == "",
                _data.make.length < 4,
                _data.model.length < 4,
                Number(_data.price) < 1,
                _data.year < 1950 ||
                _data.year > 2050));
            return;
        }
        let _confirm = window.confirm('Do you want edit current furniture');
        if (!_confirm) {
            return;
        }
        const response = await editRecord(itemId, _data);
        e.target.reset();
        console.log(response);
        page.redirect('/my-furniture');
    }
}