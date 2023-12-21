import { createSlice } from '@reduxjs/toolkit'
export interface SignupState {
  isOpen: boolean
}

const initialState: SignupState = {
  isOpen: false,
}

export const signupSlice = createSlice({
  name: 'signupstate',
  initialState,
  reducers: {
    onOpen: (state) => {
      state.isOpen = true;
    },
    onClose: (state) => {
      state.isOpen = false;
    }
  },
})

export const { onOpen, onClose } = signupSlice.actions

export default signupSlice.reducer