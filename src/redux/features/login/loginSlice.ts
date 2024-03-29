import { createSlice } from '@reduxjs/toolkit'
export interface LoginStateProps {
  isOpen: boolean
}

const initialState: LoginStateProps = {
  isOpen: false,
}

export const loginSlice = createSlice({
  name: 'loginstate',
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

export const { onOpen, onClose } = loginSlice.actions

export default loginSlice.reducer