import { createSlice } from "@reduxjs/toolkit";

export const publishBlogSlice = createSlice({
    name: 'publishBlog',
    initialState: {
        publishBlog: false,
    },
    reducers: {
      setPublishBlog: (state, action) => {
        state.publishBlog = action.payload
      },
    },
  })

  export const { setPublishBlog } = publishBlogSlice.actions
  // Action creators are generated for each case reducer function
  export default publishBlogSlice.reducer