import { PayloadAction, createSlice } from '@reduxjs/toolkit'
export interface LoginStatusStateProps {
    isLogin: boolean,
    username: string,
    location: string,
    premiumuser: boolean,
    interest?: string,
    gender: string,
}

const initialState: LoginStatusStateProps = {
    isLogin: false,
    gender: "NONE",
    location: "INDIA",
    premiumuser: false,
    username: "Guest",
    interest: "ALL",
}

export const loginStatusSlice = createSlice({
    name: 'loginstatus',
    initialState,
    reducers: {
        onLogin: (state, action: PayloadAction<LoginStatusStateProps>) => {
            state.isLogin = true;
            state.gender = action.payload.gender;
            state.location = action.payload.location;
            state.premiumuser = action.payload.premiumuser;
            state.username = action.payload.username;
            state.interest = action.payload.interest;
        },
        onLogout: (state) => {
            state.isLogin = false;
            state.gender = "NONE";
            state.location = "INDIA";
            state.premiumuser = false;
            state.username = "Guest";
            state.interest = "ALL";
        }
    },
})

export const { onLogin, onLogout } = loginStatusSlice.actions

export default loginStatusSlice.reducer