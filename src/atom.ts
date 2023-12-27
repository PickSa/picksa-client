import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist()

export const UserInfoAtom = atom({
    key: "userInfo",
    default: {
        isUser: false,
        user: {
            username: "",
        },
    },
    effects_UNSTABLE: [persistAtom],
});

export const accessTokenAtom = atom<string>({
    key: "access_token",
    default: 
    "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6IjIiLCJwb3NpdGlvbiI6IlBSRVNJREVOVCIsInBhcnQiOiJGUk9OVEVORCIsImlhdCI6MTcwMzY3ODQ3MiwiZXhwIjoxNzAzNzY0ODcyfQ.TcSL6Rcyd74mdB4RId29k7niDnzKpLYtLeUYdtZMAiI7ieE6Uo78tlPZK9wnSIYEGOyGRrUUVIaEuxzCtpoLAQ",
    effects_UNSTABLE: [persistAtom],
})

export const LoginCodeAtom = atom<string|undefined>({
    key: "googlelogin",
    default: undefined,
});