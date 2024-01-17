import { createSlice } from '@reduxjs/toolkit'
export interface UpdateProfileState {
    isOpen: boolean
}

const initialState: UpdateProfileState = {
    isOpen: false,
}

export const updateprofileSlice = createSlice({
    name: 'updateprofilestate',
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

export const { onOpen, onClose } = updateprofileSlice.actions

export default updateprofileSlice.reducer