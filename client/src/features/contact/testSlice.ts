import { createSlice } from "@reduxjs/toolkit"

export const testSlice = createSlice({
    name: 'testRTK',
    initialState: {
      myname : "5555555"
    },
    reducers: {
      incre6: state => { state.myname += "666666" },
      decre7: state => { state.myname += "777777" }
    }
  })
  
  export const { incre6, decre7 } = testSlice.actions