import { createSlice } from "@reduxjs/toolkit";

export const BlockedPostSlice = createSlice({
    name: 'blockedpost',
    initialState: {
        blockedPost: false,
    },
    reducers: {
      setBlockedPost: (state, action) => {
        state.blockedPost = action.payload
      },
    },
  })

  export const { setBlockedPost } = BlockedPostSlice.actions
  // Action creators are generated for each case reducer function
  export default BlockedPostSlice.reducer