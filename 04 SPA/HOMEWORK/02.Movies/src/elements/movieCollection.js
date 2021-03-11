import { _getRequest } from '../io/request.js'

export async function _loadMovies() {
    const response = await fetch('http://localhost:3030/data/movies');
    const data = await response.json();

    let result = '';
    data.forEach(film => {
        //   console.log(film)
        result += `<div class="card mb-4" id="${film._id}">
        <img class="card-img-top" src="${film.img}" alt="Card image cap" width="400">
        <div class="card-body">
            <h4 class="card-title">${film.title}</h4>
        </div>
        <div class="card-footer">
            <a href="#/details/6lOxMFSMkML09wux6sAF">
                <button type="button" class="btn btn-info">Details</button>
            </a>
        </div>

    </div>`
    });

    return result;

}