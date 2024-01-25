import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist()

export const UserInfoAtom = atom({
    key: "userInfo",
    default: {
        isUser: false,
        user: {
            username: "윤예원",
            userrole: "",
        },
    },
    effects_UNSTABLE: [persistAtom],
});

export const accessTokenAtom = atom<string>({
    key: "access_token",
    default: "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6IjQiLCJwb3NpdGlvbiI6IlBSRVNJREVOVCIsInBhcnQiOiJGUk9OVEVORCIsImlhdCI6MTcwNjE2MTUyNCwiZXhwIjoxNzA2MjQ3OTI0fQ.5hXvlIYcgjF6LGGc_sk9WoqvuxGtYtscO_bHJYR8sjvLE2Z5z2D8I9br_UoVsK_V0GBbSKXiIhDOSnqSG6b7ZA",
    effects_UNSTABLE: [persistAtom],
})


export const LoginCodeAtom = atom<string|undefined>({
    key: "googlelogin",
    default: undefined,
});