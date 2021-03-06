export async function _Request(url, options) {
    try {
        const response = await fetch(url, options);
        return await response.json();
    } catch (err) {
        throw new Error(err.message);
    }
}