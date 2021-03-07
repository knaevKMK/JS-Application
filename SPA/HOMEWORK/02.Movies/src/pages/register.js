import { renderHeader, renderFooter } from '../elements/header.js';
import { _e } from '../io/createTag.js';


export function _register() {
    renderHeader();
    document.querySelector('#container').appendChild(_e('section', {
        innerHTML: ` <form class="text-center border border-light p-5" action="#" method="post">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" class="form-control" placeholder="Email" name="email" value="">
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" class="form-control" placeholder="Password" name="password" value="">
                    </div>

                    <div class="form-group">
                        <label for="repeatPassword">Repeat Password</label>
                        <input type="password" class="form-control" placeholder="Repeat-Password" name="repeatPassword" value="">
                    </div>

                    <button type="submit" class="btn btn-primary">Register</button>
                </form>`,
        id: 'form-sign-up'
    }))
    renderFooter();
}