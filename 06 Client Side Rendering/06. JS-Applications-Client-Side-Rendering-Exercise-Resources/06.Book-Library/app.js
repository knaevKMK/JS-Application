import { gotoHome } from './home.js';
import { onClick, onSubmit } from './onEventListener.js';

gotoHome();

document.querySelector('body').addEventListener('click', onClick);
document.querySelector('form').addEventListener('submit', onSubmit)