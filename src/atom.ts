import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist()

export const UserInfoAtom = atom({
    key: "userInfo",
    default: {
        isUser: true,
        user: {
            username: "박경빈",
            userrole: "",
        },
    },
    effects_UNSTABLE: [persistAtom],
});

export const accessTokenAtom = atom<string>({
    key: "access_token",
    default: "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6IjIiLCJwb3NpdGlvbiI6IlBBUlRfTEVBREVSIiwicGFydCI6IkZST05URU5EIiwiaWF0IjoxNzA1NzYxMTY4LCJleHAiOjE3MDU4NDc1Njh9.IE-GRmCpGKS_tJ912NOxJSM6x-bCe72_IKuAmkCGScKGrsV6Kafvbi-bmx0WdGHpZcN5LxVpEYydnrmKZSeWbQ",
    effects_UNSTABLE: [persistAtom],
})


export const LoginCodeAtom = atom<string|undefined>({
    key: "googlelogin",
    default: undefined,
});