let form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    let submit = {};
    [...formData.entries()].forEach(entry => {
        submit[entry[0]] = entry[1]
    })
    _Submit(submit);
})

async function _Submit(submit) {

    const body = JSON.stringify(submit);
    try {
        const promise = await fetch('http://localhost:3030/user/login', {
            method: 'post',
            headers: { 'Content-Type': 'aplication/json' },
            body
        });

        const response = await promise.json();
        console.log(response)
        if (promise.status === 200) {
            sessionStorage.setItem('authToken', response.accessToken);
            window.location.pathname = 'index.html';
        }
    } catch (err) {
        alert(err.status)
    }
    console.log(body)


}