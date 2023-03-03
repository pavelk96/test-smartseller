import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import { AppState } from "./store/store";
import { UserType } from "../types/userType";
import { getUserData } from "../utils/getUserData";

export interface userState {
    isAuth: boolean;
    userData: UserType | null;
}

const initialState: userState = {
    isAuth: false,
    userData: null
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        doLoginUser(state, action) {
            state.isAuth = true;
            state.userData = action.payload;
            localStorage.setItem("userData", JSON.stringify({
                isAuth: true,
                userData: {
                    name: action.payload.name,
                    uid: "2131"
                }
            }))
        },
        checkUserAuth(state) {
            const user = getUserData();
            if (user) {
                state.isAuth = true;
                state.userData = {...user.userData}
            } else {
                state = initialState;
            }
        },
        userLogout(state) {
            state.isAuth = false;
            state.userData = null;
            localStorage.removeItem("userData");
        }
    },

    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.auth,
            };
        },
    },
});

export const { doLoginUser, checkUserAuth, userLogout } = userSlice.actions;

export const selectUserState = (state: AppState) => state.user;

export default userSlice.reducer;