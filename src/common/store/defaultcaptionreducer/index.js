import { createSlice } from "@reduxjs/toolkit";

export const defaultCaptionSlice = createSlice({
  name: 'defaultCaption',
  initialState: {
    defaultCaption: ``,
  },
  reducers: {
    setDefaultCaption: (state, action) => {
        state.defaultCaption = action.payload;
    },
    setWebpage: (state, action) => {
        state.webpageUrl = action.payload;
        const regExp = new RegExp(`https://(.*?).com`);
        (action.payload.match(regExp));
    },
  },
})

export const { setDefaultCaption, setWebpage } =  defaultCaptionSlice.actions
// Action creators are generated for each case reducer function
export default  defaultCaptionSlice.reducer