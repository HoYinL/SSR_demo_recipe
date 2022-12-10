import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'token',
    initialState: {
        token: null,
        token_payload: null,
    },
    reducers: {
      setToken: (state, action) => {
        state.token = action.payload
      },

      setTokenPayload: (state, action) => {
        state.token_payload = action.payload.token_payload
      },

      setPayloadByRes: (state, action) => {
        state.token_payload = action.payload
      }
    },
  })

  export const { setToken, setTokenPayload, setPayloadByRes } = userSlice.actions;
  // Action creators are generated for each case reducer function
  export default userSlice.reducer;