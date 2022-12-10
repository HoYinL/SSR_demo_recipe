import axios from "axios";

const baseURL = `/PublishedPost/`;
let authorization = null;

let request = axios.create({
    baseURL,
    headers: {
        "Authorization": authorization,
    },
});

export const publishNewBlog = async (userId, blogContent, featureData) => {
    let success = false
    let savedContent = null;

    await request.post(`/PostPublishedPost/${userId}`,
        {
            blogContent: blogContent,
            featureData: featureData
        }
    ).then((res) => {
        success = true;
        savedContent = res.data;
    });

    return success == true ? Promise.resolve(savedContent) : Promise.reject();
};

export const getPublishedBlog = async (userId, times) => {
    let success = false
    let savedContent = null;

    await request.get(`/GetPublishedPost/${userId}/${times}`)
        .then((res) => {
            (res);
            success = true;
            savedContent = res.data;
        });

    return success == true ? Promise.resolve(savedContent) : Promise.reject();
};

export const deletePublishedPost = async (userId, postId) => {
    let success = false
    let savedContent = null;

    await request.delete(`/DeletePublishedPost/${userId}/${postId}/`)
        .then((res) => {
            success = true;
            savedContent = res.data;
        });

    return success == true ? Promise.resolve(savedContent) : Promise.reject();
}

export const getPublishedPostFeatures = async (postId) => {
    let success = false
    let savedContent = null;

    await request.get(`/getPublishedPostFeatures/${postId}`)
        .then((res) => {
            success = true;
            savedContent = res.data;
            (savedContent);
        });

    return success == true ? Promise.resolve(savedContent) : Promise.reject();
}


