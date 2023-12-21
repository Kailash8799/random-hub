import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './features/login/loginSlice'
import signupReducer from './features/signup/signupSlice'

export const store = configureStore({
  reducer: {
      loginstate:loginReducer,
      signupstate: signupReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch