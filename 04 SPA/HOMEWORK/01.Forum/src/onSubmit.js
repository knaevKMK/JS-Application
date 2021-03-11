import { _Request } from './request.js';
import { _onLoad as onMain } from './home.js';


export async function onSubmit(event) {
    console.log('onSubmit')
    event.preventDefault();
    //   console.log(event.target)
    const formData = new FormData(event.target);
    let result = [...formData.entries()].reduce((p, [k, v]) => Object.assign(p, {
        [k]: v
    }), {});

    if (result.topicName.trim() === '' || result.username.trim() === '' || result.postText.trim() === '') {
        // shutDown button 'Cancel' SUBMIT
        if (sessionStorage.getItem('isCleared') == 'true') {
            sessionStorage.setItem('isCleared', false)
            return;
        }

        console.log('Empty field')
        sessionStorage.setItem('isCleared', false)
        return alert("Empty fields");

    }
    const commentData = await _Request('http://localhost:3030/jsonstore/collections/myboard/comments', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
    });



    result._dateCreated = `${new Date(Date.now()).toISOString()}`;
    result._comments = commentData._id;
    console.log(result)
    await _Request('http://localhost:3030/jsonstore/collections/myboard/posts', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(result)
    })
    event.target.reset();
    sessionStorage.setItem('isCleared', false)
    onMain();

}

export function onClear() {
    sessionStorage.setItem('isCleared', true);
    document.querySelector('form').reset();

}