import { createSlice } from "@reduxjs/toolkit";

export const featureSlice = createSlice({
  name: 'feature',
  initialState: {
    feature: {},
  },
  reducers: {
    setFeature: (state, action) => {
      state.feature = action.payload
    },
  },
})

export const { setFeature } = featureSlice.actions
// Action creators are generated for each case reducer function
export default featureSlice.reducer