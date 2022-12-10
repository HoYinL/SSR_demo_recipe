import axios from "axios";

const baseURL = `/CreatePost/`;
let authorization = null;

let request = axios.create({
  baseURL,
  headers: {
    "Authorization": authorization,
  },
});

export const saveNewBlog = async (urlPathName, blogContent, featureData) => {
  let success = false
  let savedContent = null;

  await request.post(`${urlPathName}`,
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

export const saveExistingBlog = async (urlPathName, blogContent, featureData) => {
  let success = false
  let savedContent = null;

  await deleteSavedContent(urlPathName)
    .then((res) => request.post(`${urlPathName}`,
      {
        blogContent: blogContent,
        featureData: featureData
      }
    ))
    .then((res) => {
      success = true;
      savedContent = res.data;
    });

  return success == true ? Promise.resolve(savedContent) : Promise.reject();
};

export const getSavedBlogContent = async (urlPathName) => {
  let success = false
  let savedContent = null;

  await request.get(urlPathName)
    .then((res) => {
      success = true;
      savedContent = res.data;
      (savedContent);
    })

  return success == true ? Promise.resolve(savedContent) : Promise.reject();
};

export const deleteSavedContent = async (urlPathName) => {
  let success = false
  let savedContent = null;

  await request.delete(urlPathName)
    .then((res) => {
      success = true;
      savedContent = res.data;
    })

  return success == true ? Promise.resolve(savedContent) : Promise.reject();
};