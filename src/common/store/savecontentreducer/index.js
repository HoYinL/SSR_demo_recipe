import { createSlice } from "@reduxjs/toolkit";

export const saveContentSlice = createSlice({
    name: 'saveContent',
    initialState: {
        saveContent: false,
    },
    reducers: {
      setSaveBlogContent: (state, action) => {
        state.saveContent = action.payload
      },
    },
  })

  export const { setSaveBlogContent } = saveContentSlice.actions
  // Action creators are generated for each case reducer function
  export default saveContentSlice.reducer