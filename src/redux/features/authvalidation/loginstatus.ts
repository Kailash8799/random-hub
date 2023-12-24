import { createSlice } from '@reduxjs/toolkit'
export interface LoginStatusStateProps {
    isLogin: boolean
}

const initialState: LoginStatusStateProps = {
    isLogin: false,
}

export const loginStatusSlice = createSlice({
    name: 'loginstatus',
    initialState,
    reducers: {
        onLogin: (state) => {
            state.isLogin = true;
        },
        onLogout: (state) => {
            state.isLogin = false;
        }
    },
})

export const { onLogin, onLogout } = loginStatusSlice.actions

export default loginStatusSlice.reducer