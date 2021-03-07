const url = 'http://localhost:3030/jsonstore/collections/students';

async function _sendRequest(url, options) {
    try {
        const response = await fetch(url, options);
        return await response.json();
    } catch (err) {
        alert(`Error: ${err.message}`)
    }
}
async function _renderTable() {
    const studentList = (await _sendRequest(url));

    document.querySelector('tbody').innerHTML = '';
    Object.values(studentList)
        .forEach(student => {
            //console.log(student)
            document.querySelector('tbody').appendChild(_e('tr',
                `<td>${student.firstName}</td>
            <td>${student.lastName}</td>
            <td>${student.facultyNumber}</td>
            <td>${Number(student.grade).toFixed(2)}</td>
            `, student._id
            ))
        });
    //add DELETE button to each student row
    //just insert row 25 to 20 and un-comment
    //<td><button onClick="_delete()">Delete</button></td>
}
async function _delete() {
    let row = (event.target.parentNode.parentNode);
    const deletedStudent = await _sendRequest(url + '/' + row.id, {
        method: 'delete'
    })
    console.log(deletedStudent);
    _renderTable();
}

function _renderForm() {
    document.querySelector('#results').appendChild(_e('tfoot',
        `<tr>
        <th></th>
            <th><h3>FORM</h3></th>
            </tr>
        <tr><form id="form1">
    <td>
    <input type = "text" id = "firstName" placeholder= "First Name..." form="form1">
    </td>
    <td>
    <input type = "text" id = "lastName" placeholder= "Last Name..."   form="form1">
    </td>
    <td>
    <input type = "text" id = "facultyNumber" placeholder= "Faculty Number..."    form="form1">
    </td>
    <td>
    <input type = "text" id = "grade" placeholder= "Grade..."  form="form1">
    </td>
    </tr>
    <tr>
    <td></td>
    <td></td>
    <td></td>
    <td>
    <input  id = "btnCretate" type="submit" class="button" value="Submit" form="form1">
    </td>
    </form></tr>`,
    ))
}

function _onLoad() {
    _renderTable();
    _renderForm();

    let form = document.getElementById('form1');
    form.addEventListener('submit', async(e) => {
        e.preventDefault();
        //   console.log('Submit');

        let formData = new FormData(form);
        try {
            for (const input of[...document.getElementsByTagName('input')]) {
                //   console.log(input.id)
                if (input.value.trim() === '') {
                    throw new Error(input.placeholder)
                }
                switch (input.id) {
                    case 'grade':
                        let temp = Number(input.value)
                        if (isNaN(temp) || temp < 2 || temp > 6) {
                            throw Error(input.placeholder + ' field accept values 2.00 to 6.00');
                        }
                        formData[input.id] = Number(input.value);
                        break;
                    case 'facultyNumber':
                        if (!input.value.match('[0-9]{3,20}')) {
                            throw new Error(input.placeholder + ' filed must include 3to 20 digits');
                        }
                    default:
                        formData[input.id] = input.value.substring(0, 1).toUpperCase() + input.value.substring(1);
                        break
                }
            }
            const body = JSON.stringify(formData);
            const newStudent = await _sendRequest(url, {
                method: "post",
                headeres: { 'Content-Type': 'application/json' },
                body
            });
            console.log(newStudent);
            form.reset();
        } catch (er) {
            console.log(er)
            alert(`Bad input data!\n${er}`)

        }
        _renderTable();
    });

}

function _e(type, inner, id, _type) {
    let temp = document.createElement(type);
    if (inner) {
        temp.innerHTML = inner;
    }
    if (id) {
        temp.id = id;
    }
    if (_type) {
        temp.type = _type;
    }
    return temp;

}
_onLoad();