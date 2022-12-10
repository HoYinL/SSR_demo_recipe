import axios from "axios";

const baseURL = `/MarkPost/`;
let authorization = null;

let request = axios.create({
  baseURL,
  headers: {
    "Authorization": authorization,
  },
});

export const markNewPost = async (userId, postId) => {
    let success = false
    let savedContent = null;
  
    await request.post(`/PostMarkedPost/${userId}/${postId}`)
      .then((res) => {
        success = true;
        savedContent = res.data;
      });
  
    return success == true ? Promise.resolve(savedContent) : Promise.reject();
  };
  
  export const getMarkedPostId = async (userId) => {
    let success = false
    let savedContent = null;
  
    await request.get(`/GetMarkedPostId/${userId}`)
      .then((res) => {
        success = true;
        savedContent = res.data;
      });
  
    return success == true ? Promise.resolve(savedContent) : Promise.reject();
  };
  
  export const getMarkedPost = async (userId, times) => {
    let success = false
    let savedContent = null;
  
    ///GetMarkedPost/:userId/:limit
    await request.get(`/GetMarkedPost/${userId}/${times}`)
      .then((res) => {
        success = true;
        savedContent = res.data;
      });
  
    return success == true ? Promise.resolve(savedContent) : Promise.reject();
  };
  
  
  export const unmarkPost = async (userId, postId) => {
    let success = false
    let savedContent = null;
  
    await request.delete(`/DeleteMarkedPost/${userId}/${postId}`)
      .then((res) => {
        success = true;
        savedContent = res.data;
      });
  
    return success == true ? Promise.resolve(savedContent) : Promise.reject();
  };