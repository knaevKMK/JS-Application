import { json } from '../client/api.js';
import { html, render } from '../node_modules/lit-html/lit-html.js';

const url = 'http://localhost:3030/jsonstore/collections/books';

export function loadEdit() {
    let form = document.querySelector('form');

    let book = {
        title: event.target.parentNode.parentNode.children[0].textContent,
        author: event.target.parentNode.parentNode.children[1].textContent,
    }
    sessionStorage.setItem('id', event.target.parentNode.parentNode.id);
    //   console.log(book)
    render(html `
    <input type="hidden" name="id">
        <h3>Edit book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title..." value=${book.title}>
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author..." value=${book.author}>
    <input type="submit" value="Save">
    `, form);
    form.id = 'edit-form';
}
export async function onLoad() {
    let result = await json(url);
    // console.log(result)
    render(Object.keys(result)
        .map(key => html `
        <tr id=${key}>
            <td>${result[key].title}</td>
            <td>${result[key].author}</td>
            <td>
            <button>Edit</button>
            <button>Delete</button>
            </td>
        </tr>
        `), document.querySelector('tbody'));
}

export function gotoHome() {
    console.log('onHome');
    render(html `
<button id="loadBooks">LOAD ALL BOOKS</button>
    <table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
        </table>

        <form id="add-form">
        </form>
`, document.body);
    //   _onLoad();
    loadFormAdd();
}

export function loadFormAdd() {
    render(html `
    <h3>Add book</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title...">
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author...">
    <input type="submit" value="Submit">
    `, document.querySelector('form'))
    document.querySelector('form').id = 'add-form'
}