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
    default: "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6IjIiLCJwb3NpdGlvbiI6IlBBUlRfTEVBREVSIiwicGFydCI6IkZST05URU5EIiwiaWF0IjoxNzA1OTA3NjA5LCJleHAiOjE3MDU5OTQwMDl9.xIjsrwF-skcUpSfakCVdQcjl54yZwqLAG32DwBq2bbGXBPtYe1Cl64uGWk0sFdpGcot1Kllnu4_3qFF8-KhWYA",
    effects_UNSTABLE: [persistAtom],
})


export const LoginCodeAtom = atom<string|undefined>({
    key: "googlelogin",
    default: undefined,
});