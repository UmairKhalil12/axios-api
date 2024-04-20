import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: false,
    userData: [],
    businessData: []
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
        },

        userInfo: (state, action) => {
            state.userData = action.payload;
        },

        businessInfo: (state, action) => {
            state.businessData = action.payload;
        }
    }
})

export const { userLogin, userLogout, userInfo, businessInfo } = userSlice.actions;
export default userSlice.reducer