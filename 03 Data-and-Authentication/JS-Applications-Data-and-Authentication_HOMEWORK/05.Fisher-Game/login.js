const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

document.getElementById('guest').innerHTML = `<a href= "login.html" class="active">Login</a>`

async function _request(url, obj) {

    const body = JSON.stringify({
        email: `${obj.email}`,
        password: `${obj.password}`
    })
    try {
        const response = await fetch(url, {
            method: 'post',
            headers: { 'Content-Type': 'application.json' },
            body
        });
        const data = await response.json();
        sessionStorage.setItem('token', data.accessToken);
        sessionStorage.setItem('_id', data._id);
        console.log(data)


        document.getElementById('guest').innerHTML = `<a href= "index.html" class="active">LogOut</a>`
        window.location.pathname = 'index.html'
    } catch (err) {
        throw new Error(err.message);
    }
}

function logIn() {
    try {
        window.addEventListener('submit', (e) => {
            e.preventDefault();
            switch (e.target.action.substring(22)) {
                case 'register':
                    _register(e.target);
                    break;
                case 'login':
                    _login(e.target);
                    break;
            }
        })

    } catch (err) {
        alert(err.message);
    }
}

async function _register(form) {

    let obj = {};
    new FormData(form).forEach((value, key) => obj[key] = value);

    if (!obj.email.match(regexEmail)) {
        throw new Error(`Error: invalid email format`);
    } else if (obj.password === '') {
        throw new Error('Error: invalid password format');
    } else if (obj.password !== obj.rePass) {
        throw new Error('Error: password & rePass NOT MATCH');
    }
    await _request('http://localhost:3030/users/register', obj);
}

async function _login(form) {
    let obj = {};

    new FormData(form).forEach((value, key) => obj[key] = value);

    if (!obj.email.match(regexEmail)) {
        throw new Error(`Error: invalid email format`);
    } else if (obj.password === '') {
        throw new Error('Error: invalid password format');
    }

    await _request('http://localhost:3030/users/login', obj)

}
logIn();