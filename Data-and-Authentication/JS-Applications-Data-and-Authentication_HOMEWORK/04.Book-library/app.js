const url = 'http://localhost:3030/jsonstore/collections/books';
let table = document.querySelector('tbody');
let formEdit = document.getElementById('edit');
let formSubmit = document.getElementById('submit');
let rowId;
async function _request(url, options) {
    try {
        const response = await fetch(url, options);
        return await response.json();
    } catch (err) {
        alert(err.message);
    }
}

function _e(type, inner, id) {
    let temp = document.createElement(type);
    if (inner) {
        temp.innerHTML = inner;
    }
    if (id) {
        temp.id = id;
    }
    return temp;
}
async function _load() {
    const data = await _request(url);
    table.innerHTML = '';
    for (const key in data) {
        table.appendChild(_e('tr',
            `<td>${data[key].title}</td>
            <td>${data[key].author}</td>
            <td>
                <button>Edit</button>
                <button>Delete</button>
            </td>
            `, key))
    }
}
//document.getElementById('loadBooks').addEventListener('click', _load);
window.addEventListener('click', (e) => {

    if (e.target.tagName === 'BUTTON') {

        switch (e.target.textContent) {
            case 'Edit':
                rowId = e.target.parentNode.parentNode.id;
                console.log(rowId)
                _editBook(e.target.parentNode.parentNode);
                break;
            case 'Delete':
                _deleteBook(e.target.parentNode.parentNode)
                break;
            case 'LOAD ALL BOOKS':
                _load();
                break;
            case 'Submit':
                e.preventDefault();
                _onSubmit(formSubmit, 'post', '');
                break;
            case 'EDIT':
                e.preventDefault();
                console.log(rowId)
                _onSubmit(formEdit, 'put', '/' + rowId)
                formEdit.style.display = 'none';
                formSubmit.style.display = 'block'
                break;
        }
    }

})

async function _onSubmit(form, method, id) {

    let [title, author] = form.querySelectorAll('input');
    if (title.value.trim() === '' || author.value.trim() === '') {
        alert(`TITLE and AUTHOR required`);
        return;
    }

    const body = JSON.stringify({
        'title': title.value,
        'author': author.value
    });
    console.log(body)
    console.log(url + id)
    const data = await _request(url + id, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body
    })
    _load();
    title.value = '';
    author.value = ''
}

function _editBook(row) {
    document.getElementById('submit').style.display = 'none';
    let [title, author] = formEdit.querySelectorAll('input');
    title.value = row.children[0].textContent;
    author.value = row.children[1].textContent;
    formEdit.style.display = 'block';

}

async function _deleteBook(row) {
    const delData = await _request(url + '/' + row.id, {
        method: 'delete'
    });
    console.log(delData);
    _load();
}
_load();