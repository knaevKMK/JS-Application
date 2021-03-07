// import { _getRequest } from './io/request.js';
import { render_Index_html } from './pages/home.js';
import { _logIn } from './pages/logIn.js';
import { _register } from './pages/register.js';
import { _onSubmitRegister, _onSubmitLogIn } from './io/submitRegister.js';
import { _addMovie, _onSubmitAddMovie } from './pages/addMovie.js';
import { _onDetail, _onDelete } from './pages/details.js';
import { _onEdit } from './pages/edit.js';
import { _onLike, _onUnLike } from './io/likes.js';

export function main() {


    render_Index_html();

    window.addEventListener('click', (e) => {

        switch (e.target.textContent) {
            case 'Login':
                console.log('log in');
                if (e.target.tagName === 'A') {
                    _logIn();
                } else if (e.target.tagName === 'BUTTON') {
                    e.preventDefault();
                    console.log('log find');
                    _onSubmitLogIn(e.target.parentNode);
                }
                break;
            case 'Register':
                console.log('Register');
                if (e.target.tagName === 'A') {
                    _register();
                } else if (e.target.tagName === 'BUTTON') {
                    e.preventDefault();
                    console.log('reg');
                    _onSubmitRegister(e.target.parentNode);
                }
                break;
            case 'Logout':
                console.log('log out');
                sessionStorage.clear();
                window.location.reload();
                break;
            case 'Add Movie':
                console.log('add movie');
                if (sessionStorage.getItem('email') === null) {
                    _logIn();
                } else {
                    _addMovie();
                }
                break;
            case 'Details':
                console.log('details');
                if (sessionStorage.getItem('email') === null) {
                    _logIn();
                } else {
                    _onDetail(e.target.parentNode.parentNode.parentNode);
                }
                break;
            case 'Delete':
                console.log('Delete')
                _onDelete(e.target.parentNode);
                break;
            case 'Edit':
                console.log('edit');
                _onEdit(e.target.parentNode.id);
                break;
            case 'Like':
                if (sessionStorage.getItem('email') === null) {
                    _logIn();
                } else {
                    _onLike(e.target.parentNode.id);
                }
                break;
            case 'UnLike':

                _onUnLike(e.target.parentNode.id);
                break;
        }

    })
}
main();