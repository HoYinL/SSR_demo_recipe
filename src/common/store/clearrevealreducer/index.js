import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'clearstate',
    initialState: {
        clearstate: false,
    },
    reducers: {
      setClearstate: (state, action) => {
        state.clearstate = action.payload
      },
    },
  })

  export const { setClearstate } = userSlice.actions
  // Action creators are generated for each case reducer function
  export default userSlice.reducer