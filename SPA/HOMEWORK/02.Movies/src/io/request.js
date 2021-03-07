export async function _getRequest(url, options) {
    try {
        const response = await fetch(url, options);
        return await response.json();
    } catch (err) {
        alert(err.message);
        throw new Error(err.message);
    }
}