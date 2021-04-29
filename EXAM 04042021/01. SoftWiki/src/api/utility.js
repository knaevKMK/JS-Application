function getUserData() {
    const user = sessionStorage.getItem('user');
    if (user) {
        return JSON.parse(user);
    } else {
        return undefined;
    }
}

function setUserData(user) {
    console.log(user);
    sessionStorage.setItem('user', JSON.stringify(user));
}

function clearUserData() {
    sessionStorage.removeItem('user');
}
export const _user = { getUserData, setUserData, clearUserData };