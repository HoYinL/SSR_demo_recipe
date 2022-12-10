import { createSlice } from "@reduxjs/toolkit";

export const ReportedPostSlice = createSlice({
    name: 'reportedpost',
    initialState: {
        reportedpost: false,
    },
    reducers: {
      setReportedPost: (state, action) => {
        state.reportedpost = action.payload
      },
    },
  })

  export const { setReportedPost } = ReportedPostSlice.actions
  // Action creators are generated for each case reducer function
  export default ReportedPostSlice.reducer