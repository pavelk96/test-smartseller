import { UserType } from "../types/userType";

export const getUserData = (): undefined | {userData: UserType, isAuth: boolean}  =>
    JSON.parse(localStorage.getItem("userData"));