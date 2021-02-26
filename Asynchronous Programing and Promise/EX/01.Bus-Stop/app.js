async function getInfo() {

    const busId = document.querySelector('#stopId');

    const url = `http://localhost:3030/jsonstore/bus/businfo/${busId.value} `;
    let resultBus = document.querySelector('#buses');
    let resultStop = document.querySelector('#stopName');

    function _createLi(text) {
        let li = document.createElement('li');
        li.textContent = text;
        resultBus.appendChild(li);
    }
    try {
        resultBus.innerHTML = '';

        const responce = await fetch(url);
        const data = await responce.json();

        resultStop.textContent = data.name;

        Object.keys(data.buses)
            .forEach(bus => _createLi(`Bus ${bus} arrives in ${data.buses[bus]} minutes`));

        busId.value = '';
    } catch (e) {
        document.querySelector('#stopName').textContent = 'Error';
    }
}