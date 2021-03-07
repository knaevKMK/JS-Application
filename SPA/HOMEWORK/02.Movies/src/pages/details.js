import { renderHeader, renderFooter } from '../elements/header.js';
import { _e } from '../io/createTag.js';
import { _getRequest } from '../io/request.js';
import { main } from '../main.js';



export async function isLiked(id) {

    const data = await _getRequest(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22`);
    console.log(data)
    for (const e of data) {
        if (e._ownerId === sessionStorage.getItem('id')) {
            return e._id;
        }
    }
    return null;
}

export async function _onDetail(div) {
    document.querySelector('#container').innerHTML = '';

    renderHeader();
    const movie = await _getRequest('http://localhost:3030/data/movies/' + div.id)
        //  console.log(movie);
    let btns = `<a class="btn btn-primary" href="#">${await isLiked(div.id) === null ? 'Like' : 'UnLike'}</a>`;

    if (sessionStorage.getItem('id') === movie._ownerId) {
        btns = `<a class="btn btn-danger" href="#">Delete</a>
<a class="btn btn-warning" href="#">Edit</a>`;
    }

    document.querySelector('#container').appendChild(_e('section', {
        id: 'movie-example',
        innerHTML: ` <div class="container">
        <div class="row bg-light text-dark">
            <h1>Movie title: ${movie.title}</h1>

            <div class="col-md-8">
                <img class="img-thumbnail" src="${movie.img}" alt="Movie">
            </div>
            <div class="col-md-4 text-center" id="${movie._id}">
                <h3 class="my-3 ">Movie Description</h3>
                <p>${movie.description}</p>
              ${btns}
                <span class="enrolled-span">Liked ${await _getLikes(movie._id)}</span>
            </div>
        </div>
    </div>`
    }));

    renderFooter();
}

export async function _onDelete(div) {
    console.log(div)
    await _getRequest('http://localhost:3030/data/movies/' + div.id, {
        method: 'delete',
        headers: {
            'X-Authorization': `${sessionStorage.getItem('token')}`
        }
    })
    main();
}

async function _getLikes(id) {
    const data = await _getRequest(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`);
    return (data);
}