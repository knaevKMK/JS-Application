import { renderHeader, renderFooter } from '../elements/header.js';
import { _getRequest } from '../io/request.js';
import { _getInputData } from '../io/formData.js';
import { _e } from '../io/createTag.js';
import { main } from '../main.js';

export function _addMovie() {
    renderHeader();
    document.querySelector('#container').appendChild(_e('section', {
        innerHTML: `
              <form class="text-center border border-light p-5" action="#" method="">
                <h1>Add Movie</h1>
                <div class="form-group">
                    <label for="title">Movie Title</label>
                    <input type="text" class="form-control" placeholder="Title" name="title" value="">
                </div>
                <div class="form-group">
                    <label for="description">Movie Description</label>
                    <textarea class="form-control" placeholder="Description" name="description"></textarea>
                </div>
                <div class="form-group">
                    <label for="imageUrl">Image url</label>
                    <input type="text" class="form-control" placeholder="Image Url" name="imageUrl" value="">
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
     `,
        id: 'add-movie'
    }))

    renderFooter();
    document.querySelector('form').addEventListener('submit', _onSubmitAddMovie);
}

export async function _onSubmitAddMovie() {
    event.preventDefault();
    const form = (document.querySelector('form'));
    const inputData = _getInputData(form);
    if (inputData.title.trim() === '' || inputData.description.trim() === '' || inputData.imageUrl.trim() === '') {
        return alert('All fields required');
    }

    console.log(inputData);
    const data = await _getRequest('http://localhost:3030/data/movies', {
        method: 'post',
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
    main();

}