import { createSlice } from "@reduxjs/toolkit";

export const publishSlice = createSlice({
    name: 'publish',
    initialState: {
        publish: false,
    },
    reducers: {
      setPublish: (state, action) => {
        state.publish = action.payload
      },
    },
  })

  export const { setPublish } = publishSlice.actions
  // Action creators are generated for each case reducer function
  export default publishSlice.reducer