import { onHome as onMain } from './home.js';
import { onSubmit, onClear } from './onSubmit.js';



const form = document.querySelector('form');
sessionStorage.setItem('isCleared', false)


async function main() {
    onMain();
    sessionStorage.setItem('isCleared', false);

    document.querySelector('nav > ul > li > a').addEventListener('click', onMain);
    document.querySelector('.topic-title').addEventListener('click', onMain);
    form.children[3].children[0].addEventListener('click', onClear);
    form.addEventListener('submit', onSubmit);
}
main();