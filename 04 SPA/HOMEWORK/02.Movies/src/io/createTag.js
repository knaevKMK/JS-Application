export function _e(type, atributes, ..._children) {
    let tag = document.createElement(type);
    if (atributes) {
        Object.keys(atributes).forEach(key => tag[key] = atributes[key]);
    }
    if (_children) {
        _children.forEach(child => tag.appendChild(child))
    }
    return tag;
}