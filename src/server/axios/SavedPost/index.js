import axios from "axios";

const baseURL = `/SavedPost/`;
let authorization = null;

let request = axios.create({
    baseURL,
    headers: {
        "Authorization": authorization,
    },
});

export const getSavedPost = async (userID, times) => {
    let success = false
    let savedContent = null;
  
    await request.get(`GetSavedPosts/${userID}/${times}/`)
    .then((res) => {
      (res);
      success = true;
      savedContent = res.data;
    })
  
    return success == true ? Promise.resolve(savedContent) : Promise.reject();
  };
  
  export const deleteSavedPost = async (userId, postId) => {
    let success = false
    let savedContent = null;
  
    await request.delete(`${userId}/${postId}/`)
    .then((res) => {
      success = true;
      savedContent = res.data;
    });
  
    return success == true ? Promise.resolve(savedContent) : Promise.reject();
  };

  export const getSavedPostFeatures = async (postID) => {
    let success = false
    let savedContent = null;
  
    await request.get(`GetSavedFeatures/${postID}`)
    .then((res) => {
      success = true;
      savedContent = res.data;
    });
  
    return success == true ? Promise.resolve(savedContent) : Promise.reject();
  };