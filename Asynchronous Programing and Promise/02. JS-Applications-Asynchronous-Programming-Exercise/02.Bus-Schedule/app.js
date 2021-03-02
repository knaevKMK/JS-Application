function solve() {

    let btnDepart = document.querySelector('#depart');
    let btnArive = document.querySelector('#arrive');
    const infoLable = document.querySelector('#info span');


    const url = `http://localhost:3030/jsonstore/bus/schedule/`;

    let currentStop = {
        next: 'depot'
    };

    // async function _makerequest(_id) {
    //     const promise = await fetch(url + _id);
    //     currentStop = await promise.json();
    // }

    async function depart() {

        //  _makerequest(currentStop.next);
        const promise = await fetch(url + currentStop.next);
        currentStop = await promise.json();

        render(`Next stop ${currentStop.name}`);
        btnDepart.disabled = true;
        btnArive.disabled = false;

    }

    function arrive() {
        render(`Arriving at ${currentStop.name}`);


        btnDepart.disabled = false;
        btnArive.disabled = true;
    }

    function render(text) {
        infoLable.textContent = text;
    }
    return {
        depart,
        arrive
    };
}

let result = solve();