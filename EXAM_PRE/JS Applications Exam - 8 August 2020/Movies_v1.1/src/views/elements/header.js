import { html, logout, page, loadSuccess, loadErr } from '../../lib.js';

const tempHeader = (logged, onLogout) => html`
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark ">
            <a class="navbar-brand text-light" href="/">Movies</a>
            <ul class="navbar-nav ml-auto ">
                ${logged != null
        ? html`<li class="nav-item">
                    <a class="nav-link">Welcome, ${logged}</a>
                </li>
                <li class="nav-item">
                    <a @click=${onLogout} class="nav-link" href="">Logout</a>
                </li> `
        : html`<li class="nav-item">
                    <a class="nav-link" href="/login">Login</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/register">Register</a>
                </li> `}
            </ul>
        </nav>
        <section class="notifications" style="display: none;">
         
        </section>
      `;
export function loadHeader() {

    const logged = sessionStorage.getItem('email');
    return (tempHeader(logged, onLogout));
    async function onLogout() {
        console.log('logout');
        try {
            await logout();
            loadSuccess('Successful logout')
        } catch (err) {
            console.log(err.message);
            loadErr('Something went wrong!')
        } finally { page.redirect('/'); }
    }
}
