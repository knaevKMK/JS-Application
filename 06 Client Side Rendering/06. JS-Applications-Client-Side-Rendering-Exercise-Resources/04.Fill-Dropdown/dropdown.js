import { json } from '../client/api.js';
import { html, render } from '../node_modules/lit-html/lit-html.js';

const url = 'http://localhost:3030/jsonstore/advanced/dropdown';
let form = document.querySelector('form');

async function _loadOptions() {
    let res = (await json(url));
    //   console.log(res);
    render(Object.keys(res).map(key => html `
        <option value=${res[key]._id}>${res[key].text}</option>
        `), document.querySelector('#menu'));

}

render(html `
<label for="itemText">
Text:
</label>
<input type="text" id="itemText" />
<label for="itemText">
Value:
</label>
<input type="text" id="itemValue" />
<input type="submit" value="Add">
`, document.querySelector('form'));

_loadOptions();

document.querySelector('form').addEventListener('submit', addItem);
async function addItem() {
    event.preventDefault();
    console.log(document.querySelector('form'))
        //   let formData = new FormData(document.querySelector('form'));

    let result = await json(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text: document.querySelector('#itemText').value
        })
    });
    if (!result.hasOwnProperty('_id')) {
        return alert('result.status');
    }
    _loadOptions();
}