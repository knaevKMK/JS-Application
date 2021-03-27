import{render,page} from './lib.js';
import { loadHeader } from './views/elements/header.js';
import{tempFooter} from './views/elements/footer.js';
import { loadHome } from './views/home.js';
import { loadLogin } from './views/login.js';
import { loadRegister } from './views/register.js';
import { loadAddMovie } from './views/add_movie.js';
import { loadDetails } from './views/details.js';
import { loadEdit } from './views/edit.js';


const main= document.querySelector('#container');

page('/', loadData, loadHome);
page('/details/:id', loadData, loadDetails);
page('/add_movie', loadData, loadAddMovie);
page('/edit/:id', loadData, loadEdit);
page('/login', loadData, loadLogin);
page('/register', loadData, loadRegister);
page('/index.html', loadData,loadHome);

page.start();

function loadData(ctx,next){
    ctx.render=(content)=>render([loadHeader(),content,tempFooter()],main);
    next();
}