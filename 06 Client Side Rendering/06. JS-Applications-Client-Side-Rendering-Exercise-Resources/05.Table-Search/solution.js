import { html, render } from '../node_modules/lit-html/lit-html.js';
import { json } from '../client/api.js';
const url = 'http://localhost:3030/jsonstore/advanced/table';



async function solve() {
    let result = await json(url);
    //  console.log(result);
    render(Object.keys(result).map(key => html `
   <tr>
      <td>${result[key].firstName} ${result[key].lastName}</td>
      <td>${result[key].email}</td>
      <td>${result[key].course}</td>
   </tr>
   `), document.querySelector('body > table > tbody'));


    document.querySelector('#searchBtn').addEventListener('click', onClick);


    function onClick() {
        let regex = document.querySelector('#searchField').value.trim().toLowerCase();

        if (regex === '') {
            //     return;
        }

        let temp = document.querySelector('tbody').children;
        console.log(temp);
        [...temp].forEach(tr => {
            if (tr.textContent.toLowerCase().includes(regex)) {
                tr.className = 'select';
            } else {
                tr.className = '';
            }
        });
        document.querySelector('#searchField').value = '';
    }
}
solve();