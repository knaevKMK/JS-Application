import { _Request } from './request.js';
import { _e } from './createTag.js';
import { onSubmit } from './onSubmit.js';
import { onBoard } from './onBoard.js';

let form;
let hp = document.querySelector('.container');
export function onHome() {
    console.log('HomePage pressed')
        //  console.log(hp)
    hp.innerHTML = `   <main>
    <div class="new-topic-border">
        <div class="header-background">
            <span>New Topic</span>
        </div>
        <form>
            <div class="new-topic-title">
                <label for="topicName">Title <span class="red">*</span></label>
                <input type="text" name="topicName" id="topicName">
            </div>
            <div class="new-topic-title">
                <label for="username">Username <span class="red">*</span></label>
                <input type="text" name="username" id="username">
            </div>
            <div class="new-topic-content">
                <label for="postText">Post <span class="red">*</span></label>
                <textarea type="text" name="postText" id="postText" rows="8" class="height"></textarea>
            </div>
            <div class="new-topic-buttons">
                <button class="cancel">Cancel</button>
                <button class="public">Post</button>
            </div>

        </form>
    </div>

    <div class="topic-title"></div></main>`;

    form = document.querySelector('form');
    document.querySelector('nav > ul > li > a').addEventListener('click', onHome);
    form.addEventListener('submit', onSubmit);
    form.children[3].children[0].addEventListener('click', onClear);
    _onLoad();
}


function onClear() {
    sessionStorage.setItem('isCleared', true);
    form.reset();

}


export async function _onLoad() {
    console.log('onLoad call')

    let father = document.querySelector('.topic-title');

    const data = await _Request('http://localhost:3030/jsonstore/collections/myboard/posts');
    father.innerHTML = '';
    for (const key in data) {
        father.appendChild(_e('div', {
            'className': 'topic-container',
            'id': `${data[key]._id}`,
            'innerHTML': `
        <div class="topic-name-wrapper">
            <div class="topic-name">
                <a href="#" class="normal">
                    <h2>${data[key].topicName}</h2>
                </a>
                <div class="columns">
                    <div>
                        <p>Date: <time>${data[key]._dateCreated}</time></p>
                        <div class="nick-name">
                            <p>Username: <span>${data[key].username}</span></p>
                        </div>
                    </div>
                    <div class="subscribers">
                    <!-- <button class="subscribe">Subscribe</button> -->
                        <p>Subscribers: <span>${data[key].postText.length}</span></p>
                    </div>
                </div>
            </div>
        </div>`
        }))
    }
    document.querySelector('.topic-title').addEventListener('click', onBoard);
}