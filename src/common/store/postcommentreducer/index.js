import { createSlice } from "@reduxjs/toolkit";

export const PostedCommentSlice = createSlice({
    name: 'postedComment',
    initialState: {
        postedComment: false,
    },
    reducers: {
      setPostedComment: (state, action) => {
        state.postedComment = action.payload
      },
    },
  })

  export const { setPostedComment } = PostedCommentSlice.actions
  // Action creators are generated for each case reducer function
  export default PostedCommentSlice.reducer