const token = sessionStorage.getItem('token');

const url = 'http://localhost:3030/data/catches';

let isLoged = sessionStorage.getItem('token') == null ? false : true;

let shape = document.querySelector('#catches');
let formSubmit = document.querySelector('aside');


function activeteBtn() {
    document.querySelectorAll('button').forEach(btn => {
        if (btn.className != 'load' && btn.className != 'add' &&
            (sessionStorage.getItem('_id') === btn.parentNode.children[0].textContent)) {
            btn.disabled = false;
        }

    });
}


function attachEvents() {
    // if (token == null) {
    //     window.location.pathname = 'login.html';
    // }



    if (isLoged) {
        _load();
        document.querySelector('.add').disabled = false;
        document.getElementById('guest').innerHTML = `<a src="_logOut" class="active">LogOut</a>`

    } else {
        // window.location.pathname = 'login.html';
        document.getElementById('guest').innerHTML = `<a href= "login.html" class="active">Login</a>`
    }

    window.addEventListener('click', (e) => {
        if (e.target.textContent == 'LogOut') {
            _logOut();

        }
        if (e.target.tagName === 'BUTTON') {
            try {
                switch (e.target.className) {
                    case 'update':
                        console.log("Update")
                        _update(e.target.parentNode);
                        break;
                    case 'delete':
                        _delete(e.target.parentNode)
                        break;
                    case 'load':
                        _load();
                        break;
                    case 'add':
                        console.log('ADD')
                        _create(formSubmit);
                        break;

                }

            } catch (err) {
                alert(err.message)
            }
        }

    })
}

function _logOut() {
    sessionStorage.clear();
    window.location.pathname = 'index.html';

    attachEvents();
}
async function _create(form) {

    let inputs = form.querySelectorAll('input');
    console.log(inputs);
    // if (title.value.trim() === '' || author.value.trim() === '') {
    //     alert(`TITLE and AUTHOR required`);
    //     return;
    // }

    const body = JSON.stringify({
        bait: `${inputs[4].value}`,
        'angler': `${inputs[0].value}`,
        'captureTime ': `${inputs[5].value}`,
        location: `${inputs[3].value}`,
        species: `${inputs[2].value}`,
        weight: `${inputs[1].value}`,
        _createdOn: `${Date.now()}`,
        _ownerId: sessionStorage.getItem('_id')
    });


    const data = await _request(url, {
        method: 'post',
        headers: {
            'X-Authorization': token,
            'Content-Type': 'application/json'
        },
        body
    })
    if (data.code === 403) {
        window.location.pathname = 'login.html'
    }
    _load();
    console.log(data)

}

async function _update(form) {
    let inputs = form.querySelectorAll('input');
    console.log(inputs);
    // if (title.value.trim() === '' || author.value.trim() === '') {
    //     alert(`TITLE and AUTHOR required`);
    //     return;
    // }
    try {
        const body = JSON.stringify({
            bait: `${inputs[4].value}`,
            'angler': `${inputs[0].value}`,
            'captureTime ': `${inputs[5].value}`,
            location: `${inputs[3].value}`,
            species: `${inputs[2].value}`,
            weight: `${inputs[1].value}`,
            _createdOn: `${Date.now()}`,
            _ownerId: sessionStorage.getItem('_id')
        });


        const data = await _request(url + '/' + form.id, {
            method: 'put',
            headers: {
                'X-Authorization': token,
                'Content-Type': 'application/json'
            },
            body
        })
        if (data.code === 403) {
            throw new Error('The event can be update only from it\'s owner\n' + data.code + ':' + data.message);
        }
    } catch (err) {
        alert(err.message)
    }

    _load();
    //   console.log(data)

}

async function _delete(row) {
    console.log(row.id)
    let delData;
    try {
        delData = await _request(url + '/' + row.id, {
            method: 'delete',
            headers: {
                'X-Authorization': token,
                'Content-Type': 'application/json'
            }
        });
        console.log(delData)
        if (delData.code === 403) {
            throw new Error('The event can be deleted only from it\'s owner\n' + delData.code + ':' + delData.message);
        }
        _load();
    } catch (err) {
        alert(err)
    }

}


attachEvents();
// _load();

async function _load() {
    const data = await _request(url);

    shape.innerHTML = '';
    for (let i = 0; i < data.length; i++) {
        const _catch = data[i];
        //  console.log(_catch)
        shape.appendChild(_e('div',
            `<p hidden>${_catch._ownerId}</p>
        <label id =${_catch._ownerId}>Angler</label>
        <input type="text" class="angler" value="${_catch.angler}" />
        <hr>
            <label>Weight</label>
            <input type="number" class="weight" value="${_catch.weight}" />
            <hr>
            <label>Species</label>
            <input type="text" class="species" value="${_catch.species}" />
            <hr>
            <label>Location</label>
            <input type="text" class="location" value="${_catch.location}" />
            <hr>
            <label>Bait</label>
            <input type="text" class="bait" value="${_catch.bait}" />
            <hr>
            <label>Capture Time</label>
            <input type="number" class="captureTime" value="${_catch['captureTime ']}" />
            <hr>
            <button disabled class="update">Update</button>
            <button  disabled class="delete">Delete</button>
            `, _catch._id));
    }
    activeteBtn();
}
async function _request(url, options) {
    try {
        const response = await fetch(url, options);
        return await response.json();
    } catch (err) {
        throw new Error(err.message);
    }
}

function _e(type, inner, id) {
    let temp = document.createElement(type);
    if (inner) {
        temp.innerHTML = inner;
    }
    if (id) {
        temp.id = id
    }
    temp.className = 'catch';
    return temp;
}