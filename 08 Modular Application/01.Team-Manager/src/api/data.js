import * as api from './api.js';
const host = 'http://localhost:3030/';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;


//use for get all data
//work
export async function getCatalog() {
    const data = await (await fetch(host + `data/teams`)).json();
    let result = [];
    Object.keys(data).forEach(key => result.push(data[key]));
    return result;
}

//createTeam
//work
export async function createTeam(data) {
    const token = sessionStorage.getItem('token');
    return await (await fetch('http://localhost:3030/data/teams', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
        },
        body: JSON.stringify(data)
    })).json();
}

// get by item Id
//work
export async function getTeamById(teamId) {
    return await (await fetch(host + `data/teams/` + teamId)).json();
}
export async function getMembers(teamIds) {
    const query = encodeURIComponent(`team IN ("${teamIds.join('", "')}") AND status="member"`)
    return await (await fetch(host +
        `data/members?where=${query}`)).json();
}
export async function getRequestByTeamId(teamId) {
    return await (await fetch(host + `/data/members?where=teamId%3D%22${teamId}%22&load=use%3D_ownerId%3Ausers`)).json();
}
export async function getAllMembersInTeamById(teamId) {
    return await (await fetch(host +
        `data/members?where=teamId%3D%22${teamId}%22%20AND%20status%3D%22member%22 &load=user%3DuserId%3Ausers`)).json();
}

//•	Request to join a team (body contains teamId):
export async function sendJoin(data) {
    const token = sessionStorage.getItem('token');
    return await (await fetch(host + `data/members`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
        },
        body: JSON.stringify(data)
    })).json();
}
//•	Aprove join a team request (body contains teamId):
export async function acceptJoin(data) {
    const _data = Object.assign({}, data, { status: 'member' });
    const token = sessionStorage.getItem('token');
    return await (await fetch(host + `data/members/` + data._id, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
        },
        body: JSON.stringify(_data)
    })).json();
}
//•	Delete join a team request (body contains teamId):
export async function rejectJoin(id) {
    const token = sessionStorage.getItem('token');
    return await (await fetch(host + `data/members/` + id, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
        }
    })).json();
}
//•	Reject membership request / leave team / remove member:
export async function deleteMemberFromTeam(requestId) {
    return await api.del(host + 'data/members/' + requestId)
}

//	Accept membership request (body contains status set to "member"):
export async function addToTeam(requestId, data) {
    const token = sessionStorage.getItem('token');
    return await (await fetch('data/members/' + requestId, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
        },
        body: JSON.stringify(data)
    })).json();
}
//====================
//edit team
// work
export async function editTeam(itemId, data) {
    const token = sessionStorage.getItem('token');
    console.log(itemId);
    console.log(data);
    return await (await fetch(`http://localhost:3030/data/teams/${itemId}`, {
        method: "put",
        headers: {
            "Content-Type": "application/json",
            'X-Authorization': token
        },
        body: JSON.stringify(data)
    })).json()
}

export async function getOwnTeams(userId) {
    return await (await fetch(host + `data/teams?where=_ownerId%3D%22${userId}%22`)).json();
}
export async function getMemberInTeams(userId) {
    return await (await fetch(host + `/data/members?where=_ownerId%3D%22${userId}%22%20AND%20status%3D%22member%22&load=team%3DteamId%3Ateams`)).json();
}

export async function getMemberCountOfTeam(teamId) {
    return await (await fetch(host + `/data/members?where=teamId%3D%22${teamId}%22%20AND%20status%3D%22member%22&count`)).json();
}


//DELETE RECEORD
//WORK
export async function deleteRecord(id) {
    return await api.del(host + 'jsonstore/shoes/' + id)
}





export function getFormData(form) {
    // console.log(form)
    const formData = new FormData(form);
    [...formData.entries()].forEach(e => console.log(e))
    return [...formData.entries()].reduce((p, [k, v]) => Object.assign(p, {
        [k]: v
    }), {});
}