import { createSlice } from "@reduxjs/toolkit";

export const saveSlice = createSlice({
    name: 'save',
    initialState: {
        save: false,
    },
    reducers: {
      setSave: (state, action) => {
        state.save = action.payload
      },
    },
  })

  export const { setSave } = saveSlice.actions
  // Action creators are generated for each case reducer function
  export default saveSlice.reducer