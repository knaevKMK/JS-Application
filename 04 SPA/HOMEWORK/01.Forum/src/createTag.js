export function _e(type, attributs, childrenS) {
    let tag = document.createElement(type);

    if (attributs) {
        for (const key in attributs) {
            tag[key] = attributs[key];

        }
    }
    if (childrenS) {

        childrenS.forEach(child => tag.appendChild(child));
    }

    return tag;
}