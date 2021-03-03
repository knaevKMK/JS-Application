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
                `
            <td>${student.firstName}</td>
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
        `<tr><form id="form1">
    <td>
    <input type = "text" id = "firstName" placeholder= "First Name..."pattern="[A-Z]{1}[a-z]{1,}" form="form1">
    </td>
    <td>
    <input type = "text" id = "lastName" placeholder= "Last Name..."  pattern="[A-Z]{1}[a-z]{1,}"  form="form1">
    </td>
    <td>
    <input type = "text" id = "facultyNumber" placeholder= "Faculty Number..."  pattern="[0-9]{3,22}"  form="form1">
    </td>
    <td>
    <input type = "text" id = "grade" placeholder= "Grade..."  pattern="[2-6]{1}\.*[0-9]{0,2}" form="form1">
    </td>
    <td>
    <button  id = "btnCretate" type="submit" class="button" form="form1">Submit</button>
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
        console.log('Submit');

        let formData = new FormData(form);
        for (const input of[...document.getElementsByTagName('input')]) {
            //   console.log(input.id)
            if (input.value.trim() === '') {
                alert(`Bad input data of ${input.placeholder}`)
                return;
            }
            if (input.id === 'grade') {
                formData[input.id] = Number(input.value);
                continue;
            }
            formData[input.id] = input.value
        }

        const body = JSON.stringify(formData);
        const newStudent = await _sendRequest(url, {
            method: "post",
            headeres: { 'Content-Type': 'application/json' },
            body
        });
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