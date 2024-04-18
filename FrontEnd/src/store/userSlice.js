import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,

    reducers: {
        userLogin: (state, action) => {
            state.user = action.payload;
        },

        userLogout: (state, action) => {
            state.user = action.payload;
        }
    }
})

export const { userLogin , userLogout} = userSlice.actions;
export default userSlice.reducer