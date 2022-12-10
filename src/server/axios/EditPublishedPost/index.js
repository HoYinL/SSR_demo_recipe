import axios from "axios";

const baseURL = `/EditPublishedPost/`;
let authorization = null;

let request = axios.create({
  baseURL,
  headers: {
    "Authorization": authorization,
  },
});

export const editPublishedBlog = async (urlPathName, blogContent, featureData) => {
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

export const getPublishedBlogContent = async (urlPathName) => {
  let success = false
  let savedContent = null;

  await request.get(urlPathName)
    .then((res) => {
      success = true;
      savedContent = res.data;
    })

  return success == true ? Promise.resolve(savedContent) : Promise.reject();
};

export const deletePublishedBlogContent = async (urlPathName) => {
  let success = false
  let savedContent = null;

  await request.delete(urlPathName)
    .then((res) => {
      success = true;
      savedContent = res.data;
    })

  return success == true ? Promise.resolve(savedContent) : Promise.reject();
};
  