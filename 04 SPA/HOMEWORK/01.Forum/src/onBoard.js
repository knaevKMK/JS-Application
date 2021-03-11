import { _Request } from './request.js';
let id;
let _event;
export async function onBoard(event) {
    let div = (event.target);
    _event = event;
    while (div.className !== 'topic-container') {
        div = div.parentNode;
    }
    console.log(div);
    const data = await _Request('http://localhost:3030/jsonstore/collections/myboard/posts' + '/' + div.id);
    id = data._comments;
    console.log(data)
    let hp = document.querySelector('.container');
    let comments = await _Request('http://localhost:3030/jsonstore/collections/myboard/comments/' + id);
    console.log(comments);

    let cResult = '';

    for (const key in comments) {
        console.log(key)
        let c = comments[key];
        if (key === '_id') {
            continue;
        }
        console.log(c)
        cResult += `<div class="comment">
        <header class="header">
            <p><span>${c.username}</span> posted on <time>${c._dateCreated}</time></p>
        </header>
        <div class="comment-main">
            <div class="userdetails">
                <img src="./static/profile.png" alt="avatar">
            </div>
            <div class="post-content">
                <p>${c.postText}</p>
            </div>
        </div>
        <div class="footer">
            <p><span>${c.username.length}</span> likes</p>
        </div>
    </div>
    `

    };
    hp.innerHTML = `<div class="container">
         <!-- topic content  -->
         <div class="topic-content">
             <!-- topic-title  -->
             <div class="topic-title">
                 <div class="topic-name-wrapper">
                     <div class="topic-name">
                         <h2>${data.topicName}</h2>
                         <p>Date: <time>${data._dateCreated}</time></p>
                     </div>
                     <div class="subscribers">
                         <p>Subscribers: <span>${data.postText.length}</span></p>
                         <!-- <button class="subscribe">Subscribe</button>
                         <button class="unsubscribe">Unsubscribe</button> -->
                     </div>
                 </div>
             </div>
             <div class="comment">
             <header class="header">
                 <p><span>${data.username}</span> posted on <time>${data._dateCreated}</time></p>
             </header>
             <div class="comment-main">
                 <div class="userdetails">
                     <img src="./static/profile.png" alt="avatar">
                 </div>
                 <div class="post-content">
                     <p>${data.postText}</p>
                     <p>${data.postText}</p>
                 </div>
             </div>
             <div class="footer">
                 <p><span>${data.username.length}</span> likes</p>
             </div>
         </div>
         ${cResult}
         <div class="answer-comment">
        <p><span>currentUser</span> comment:</p>
        <div class="answer">
            <form>
                <textarea name="postText" id="comment" cols="30" rows="10"></textarea>
                <div>
                    <label for="username">Username <span class="red">*</span></label>
                    <input type="text" name="username" id="username">
                </div>
                <button>Post</button>
            </form>
        </div>
    </div>
             </div>`;
    document.querySelector('form').addEventListener('submit', onSubmitC);
}

async function onSubmitC() {
    event.preventDefault();
    const formData = new FormData(document.querySelector('form'));
    let _body = [...formData.entries()].reduce((p, [k, v]) => Object.assign(p, {
        [k]: v
    }), {});

    if (_body.username.trim() === '' || _body.postText.trim() === '') {
        return alert('Empty fields');
    }
    _body._dateCreated = `${JSON.stringify(new Date()).substring(1, 20).replace('T', ' ')}`;
    _body.likes = [];

    await _Request('http://localhost:3030/jsonstore/collections/myboard/comments/' + id, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(_body)
    })
    onBoard(_event);
}