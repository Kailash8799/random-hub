import { createSlice } from '@reduxjs/toolkit'
export interface ResetPasswordStateProps {
    isOpen: boolean
}

const initialState: ResetPasswordStateProps = {
    isOpen: false,
}

export const resetpasswordSlice = createSlice({
    name: 'resetpasswordstate',
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

export const { onOpen, onClose } = resetpasswordSlice.actions

export default resetpasswordSlice.reducer