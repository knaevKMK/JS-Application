let form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    _Submit(_getData(formData));
})

function _getData(map) {
    let result = {};
    [...map.entries()].forEach(e => result[e[0]] = e[1]);
    return result;
}
async function _Submit(submit) {
    const body = JSON.stringify(submit);
    console.log(body)
}