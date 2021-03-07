import { _getRequest, } from './request.js';
import { _getInputData } from './formData.js';
import { main } from '../main.js';

const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;


export async function _onSubmitRegister(form) {
    console.log('reg OnSubmit');

    let inputData = _getInputData(form);
    console.log(inputData)
        //  console.log(inputData.password.length)
    if (!inputData.email.match(regexEmail)) {
        return alert('Invalid e-mail');
    }
    if (inputData.password.length < 6) {
        return alert('password should be at least 6 characters long');
    }
    if (inputData.password !== inputData.repeatPassword) {
        return alert('repeat password should be equal to the password');
    }

    const _data = await _getRequest('http://localhost:3030/users/register', {
        method: 'post',
        headers: { 'Content-Type': 'applivation/json' },
        body: JSON.stringify({
            'email': `${inputData.email}`,
            'password': `${inputData.password}`
        })
    });
    console.log(_data);
    if (_data.hasOwnProperty('code')) {
        return alert(_data.message);
    }
    sessionStorage.setItem('token', `${_data.accessToken}`);
    sessionStorage.setItem('email', `${_data.email}`);
    sessionStorage.setItem('id', `${_data._id}`);
    console.log(sessionStorage.getItem('token'))
    main();
    form.reset();

}




export async function _onSubmitLogIn(form) {
    let inputData = _getInputData(form);
    console.log(inputData)
    if (inputData.email.trim() === '' || inputData.password.trim() === '') {
        return alert('email and password require')
    }
    const _data = await _getRequest('http://localhost:3030/users/login', {
        method: 'post',
        headers: { 'Content-Type': 'applivation/json' },
        body: JSON.stringify({
            'email': `${inputData.email}`,
            'password': `${inputData.password}`
        })
    });
    console.log(_data);
    if (_data.hasOwnProperty('code')) {
        return alert(_data.message);
    }
    sessionStorage.setItem('token', `${_data.accessToken}`);
    sessionStorage.setItem('email', `${_data.email}`);
    sessionStorage.setItem('id', `${_data._id}`);
    console.log(sessionStorage.getItem('token'))
    main();
    form.reset();
}