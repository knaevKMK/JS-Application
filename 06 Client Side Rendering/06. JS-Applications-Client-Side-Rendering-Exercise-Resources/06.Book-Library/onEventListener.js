import { json } from '../client/api.js';
import { onLoad, loadEdit, loadFormAdd } from './home.js';

const url = 'http://localhost:3030/jsonstore/collections/books';

export function onClick() {
    if (event.target.tagName) {
        switch (event.target.textContent) {
            case 'LOAD ALL BOOKS':
                onLoad();
                break;
            case 'Edit':
                console.log('edit')
                loadEdit();
                break;
            case 'Delete':
                console.log('delete')
                onDelete();
                break;
        }
    }
}
async function onDelete() {
    let id = (event.target.parentNode.parentNode.id);
    let confirm = window.confirm('You will delete this book. Do you accept?');
    if (!confirm) {
        return;
    }
    let response = await json(url + '/' + id, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log(response.code);
    onLoad();
}

export async function onSubmit() {
    event.preventDefault();
    let form = document.querySelector('form');
    if (form.id !== 'add-form') {
        let confirm = window.confirm('You will Edit the book');
        if (!confirm) {
            return;
        }
    }
    console.log('onSubmit');
    let formData = new FormData(form);
    let _body = Array.from(formData.entries())
        .reduce((p, [k, v]) => Object.assign(p, {
            [k]: v
        }), {})
    if (_body.author === '' || _body.title === '') {

        return alert('All fields required')
    }

    let _url = url;
    let options = {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(_body)
    }
    console.log(form.id)
    if (form.id !== 'add-form') {
        _url = url + '/' + sessionStorage.getItem('id');
        options.method = 'put'
    }
    console.log(options, _url)
    const response = await json(_url, options);
    console.log(response)
    form.reset();
    loadFormAdd();
    onLoad();
}