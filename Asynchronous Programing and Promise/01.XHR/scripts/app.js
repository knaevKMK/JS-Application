function loadRepos() {

    const url = 'https://api.github.com/users/testnakov/repos';
    let result = document.getElementById('res');

    fetch(url)
        .then(promise => promise.json())
        .then(data => {
            result.textContent = JSON.stringify(data);
        })
}