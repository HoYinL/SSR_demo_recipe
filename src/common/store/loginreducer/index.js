import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//import axios from "axios";

/*export const setState = createAsyncThunk(
  'user/setState',
  async () => {
    const response = await axios.get("https://reqres.in/api/users?page=2")
    let {data} = response;
    return data
  }
)*/

export const loginSlice = createSlice({
    name: 'loginState',
    initialState: {
        loginState: false,
        userInfo: {},
    },
    reducers: {
      setupLoginState: (state, action) => {
        state.loginState = action.payload;
      }
    },
    /*extraReducers(builder){
      builder.addCase(
        setState.pending, (state, action) => {
          state.loginState = true;
        }
      )
    }*/
})

export const { setupLoginState } = loginSlice.actions

export default loginSlice.reducer