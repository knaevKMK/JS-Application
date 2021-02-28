let options = document.querySelector('#posts');

function _createTag(type, text, _value, id) {
    let temp = document.createElement(type);
    if (text) {
        temp.textContent = text;
    }
    if (_value) {
        temp.value = _value;
    }
    if (id) {
        temp.id = id;
    }
    return temp;
}
async function _loadPosts(e) {
    try {
        options.innerHTML = '';
        const response = await fetch('http://localhost:3030/jsonstore/blog/posts');
        let posts = await response.json();

        for (const post in posts) {
            const item = posts[post];
            options.appendChild(_createTag('option', item.title.toUpperCase(), item.id));
        }
    } catch (error) {
        alert('Error: server does not load Posts')
    }
}

async function _loadComments(e) {
    let comments = [];
    let post = {};
    for (const option of options.children) {
        if (option.selected) {
            try {
                const response = await fetch('http://localhost:3030/jsonstore/blog/comments/');
                const data = await response.json();
                comments = Object.values(data).filter(c => c.postId === option.value);
                const response2 = await fetch('http://localhost:3030/jsonstore/blog/posts');
                let posts = await response2.json();
                post = (posts[option.value])
            } catch {
                alert('Error: server does not load Comments')
            }
            break;
        }
    }

    _render(comments, post)
}


function _render(comments, post) {
    let h1 = document.querySelector('#post-title');
    h1.textContent = post.title;
    document.getElementById('post-body').remove();
    document.body.insertBefore(_createTag('p', post.body, false, 'post-body'), document.querySelector('h2'));

    let ulComm = document.querySelector('#post-comments');
    ulComm.innerHTML = '';
    for (const key of comments) {
        console.log(key)
        ulComm.appendChild(_createTag('li', key.text, false, key.id))

    }
}

function attachEvents() {

    document.querySelector('#btnLoadPosts').addEventListener('click', _loadPosts);
    document.querySelector('#btnViewPost').addEventListener('click', _loadComments);
}

attachEvents();