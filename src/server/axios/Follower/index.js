import axios from "axios";

const baseURL = `/Follower/`;
let authorization = null;

let request = axios.create({
    baseURL,
    headers: {
        "Authorization": authorization,
    },
});

export const postFollowUser = async (userId, followerId) => {
    let success = false
    let savedContent = null;

    await request.post(`/${userId}/FollowUser/${followerId}`)
        .then((res) => {
            success = true;
            savedContent = res.data;
        });

    return success == true ? Promise.resolve(savedContent) : Promise.reject();
};

export const postFollower = async (userId, followerId) => {
    let success = false
    let savedContent = null;

    await request.post(`/${userId}/Follower/${followerId}`)
        .then((res) => {
            success = true;
            savedContent = res.data;
        });

    return success == true ? Promise.resolve(savedContent) : Promise.reject();
}

export const deleteFollowUser = async (userId, followerId) => {
    let success = false
    let savedContent = null;

    await request.delete(`/${userId}/FollowUser/${followerId}`)
        .then((res) => {
            success = true;
            savedContent = res.data;
        });

    return success == true ? Promise.resolve(savedContent) : Promise.reject();
};

export const deleteFollower = async (userId, followerId) => {
    let success = false
    let savedContent = null;

    await request.delete(`/${userId}/Follower/${followerId}`)
        .then((res) => {
            success = true;
            savedContent = res.data;
        });

    return success == true ? Promise.resolve(savedContent) : Promise.reject();
};

export const getFollowUser = async (userId, followerId) => {
    let success = false
    let savedContent = null;

    await request.get(`/${userId}/FollowUser/${followerId}`)
        .then((res) => {
            success = true;
            savedContent = res.data;
        });

    return success == true ? Promise.resolve(savedContent) : Promise.reject();
};

export const getFollowingUser = async (userId, times) => {
    let success = false
    let savedContent = null;

    await request.get(`/${userId}/FollowingUser/${times}`)
        .then((res) => {
            (res);
            success = true;
            savedContent = res.data;
        });

    return success == true ? Promise.resolve(savedContent) : Promise.reject();
};

export const getFollowerNo = async (userId) => {
    let success = false
    let savedContent = null;

    await request.get(`/${userId}/GetFollowerNumber/`)
        .then((res) => {
            success = true;
            savedContent = res.data;
        });

    return success == true ? Promise.resolve(savedContent) : Promise.reject();
}