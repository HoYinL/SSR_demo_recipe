import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'paddingBottom',
    initialState: {
        paddingBottom: '',
    },
    reducers: {
      setPaddingBottom: (state, action) => {
        state.paddingBottom = action.payload
      }
    },
  })

  export const { setPaddingBottom } = userSlice.actions
  // Action creators are generated for each case reducer function
  export default userSlice.reducer