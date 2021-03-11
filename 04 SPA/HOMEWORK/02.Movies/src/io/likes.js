import { isLiked, _onDetail } from "../pages/details.js";
import { _e } from "./createTag.js";
import { _getRequest } from "./request.js";

export async function _onLike(id) {


    console.log(id);
    // console.log(`${sessionStorage.getItem('id')}`)
    const data = await _getRequest(`http://localhost:3030/data/likes`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': `${sessionStorage.getItem('token')}`
        },
        body: JSON.stringify({ movieId: `${id}`, _ownerId: `${sessionStorage.getItem('id')}` })
    });

    _onDetail(_e('div', { id: `${id}` }));
    // console.log(data);
    //console.log(`${sessionStorage.getItem('id')}`)

}
export async function _onUnLike(id) {

    const _id = await isLiked(id)
    console.log(_id);
    const data = await _getRequest(`http://localhost:3030/data/likes/` + _id, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': `${sessionStorage.getItem('token')}`
        },

    });

    _onDetail(_e('div', { id: `${id}` }));
    // console.log(data);
    //console.log(`${sessionStorage.getItem('id')}`)

}