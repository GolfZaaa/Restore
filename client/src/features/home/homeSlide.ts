import { createSlice } from "@reduxjs/toolkit"

export const homeSlide = createSlice({
    name: 'screen',
    initialState: {
      fullscreen : false
    },
    reducers: {
      setscreen: (state) => { state.fullscreen = !state.fullscreen }
    }
  })
  
  export const {setscreen} = homeSlide.actions