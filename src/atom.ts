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
    default: "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6IjIiLCJwb3NpdGlvbiI6IlBBUlRfTEVBREVSIiwicGFydCI6IkZST05URU5EIiwiaWF0IjoxNzA1NzcyMjI5LCJleHAiOjE3MDU4NTg2Mjl9.-62Bb21OsdvkJx6cu5meM-QCiewS-BUUfqmrY-xuSRvSwHCdBPFkEpJSfF8Xw2HrGk2Io1KkaL1y44Jabgcl_Q",
    effects_UNSTABLE: [persistAtom],
})


export const LoginCodeAtom = atom<string|undefined>({
    key: "googlelogin",
    default: undefined,
});