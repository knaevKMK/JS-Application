import { renderHeader, renderFooter } from "../elements/header.js";
import { _e } from "../io/createTag.js";
import { _getInputData } from "../io/formData.js";
import { _getRequest } from "../io/request.js";
import { _onDetail } from "./details.js";


let _movie;
export async function _onEdit(id) {
    _movie = await _getRequest('http://localhost:3030/data/movies/' + id);
    console.log(_movie)
    renderHeader();
    document.querySelector('#container').appendChild(_e('section', {
        innerHTML: `
        <form class="text-center border border-light p-5" action="#" method="">
        <h1>Edit Movie</h1>
        <div class="form-group">
            <label for="title">Movie Title</label>
            <input type="text" class="form-control" placeholder="${_movie.title}" value="${_movie.title}" name="title">
        </div>
        <div class="form-group">
            <label for="description">Movie Description</label>
            <textarea class="form-control" placeholder="${_movie.description}" name="description">${_movie.description}</textarea>
        </div>
        <div class="form-group">
            <label for="imageUrl">Image url</label>
            <input type="text" class="form-control" placeholder="${_movie.img}" value="${_movie.img}" name="imageUrl">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
     `,
        id: 'edit-movie'
    }))

    renderFooter();
    document.querySelector('form').addEventListener('submit', _onEditMovie);
}

async function _onEditMovie() {
    event.preventDefault();
    const form = document.querySelector('form');
    let inputData = _getInputData(form);
    console.log(inputData);
    const data = await _getRequest('http://localhost:3030/data/movies/' + _movie._id, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': `${sessionStorage.getItem('token')}`
        },
        body: JSON.stringify({
            description: `${inputData.description}`,
            img: `${inputData.imageUrl}`,
            title: `${inputData.title}`,
            _ownerId: `${sessionStorage.getItem('id')}`
        })
    })
    console.log(data);
    _onDetail(_e('div', { id: `${_movie._id}` }));

}