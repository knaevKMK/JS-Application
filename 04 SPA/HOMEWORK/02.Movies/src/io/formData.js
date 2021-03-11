export function _getInputData(form) {

    let formData = new FormData(form);

    return [...formData.entries()].reduce((p, [k, v]) => Object.assign(p, {
        [k]: v
    }), {});

}