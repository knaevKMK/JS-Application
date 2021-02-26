function loadRepos() {
    let username = document.querySelector('#username').value;
    const url = `https://api.github.com/users/${username}/repos`;
    let result = document.querySelector('#repos');

    function _createLi(_url, _text) {
        let li = document.createElement('li');
        result.appendChild(li);
        let a = document.createElement('a');
        li.appendChild(a);
        a.href = _url;
        a.textContent = _text;
    }
    fetch(url)
        .then(promise => promise.json())
        .then(data => {
            result.innerHTML = '';
            data.forEach(element => {
                _createLi(element.svn_url, element.full_name)
                console.log((element))
            });
        });

}