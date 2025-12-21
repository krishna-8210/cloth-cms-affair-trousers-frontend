import { removeToken } from '../libs/token';
import { createSlice } from '@reduxjs/toolkit'


export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
      isLogin: false,
    },
    reducers: {
        makelogin: (state,action) => {
        console.log(action);
        state.isLogin=true;

      },
      logout: (state,action) => {
        removeToken();
        state.isLogin=false;
      },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { makelogin,logout } = counterSlice.actions
  
  export default counterSlice.reducer