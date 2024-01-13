import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist()

export const UserInfoAtom = atom({
    key: "userInfo",
    default: {
        isUser: true,
        user: {
            username: "윤예원",
        },
    },
    effects_UNSTABLE: [persistAtom],
});

export const accessTokenAtom = atom<string>({
    key: "access_token",
    default: "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6IjQiLCJwb3NpdGlvbiI6IlBBUlRfTEVBREVSIiwicGFydCI6IkZST05URU5EIiwiaWF0IjoxNzA1MTA2ODk2LCJleHAiOjE3MDUxOTMyOTZ9.ac5ui6S26Tj6twORouYxhtE7XVMS6ViaSENWv-rT0pmRyabJ-EeGi5pHQJYpjURhoyYi05raGI_y5Hm6eUUP9g",
    effects_UNSTABLE: [persistAtom],
})


export const LoginCodeAtom = atom<string|undefined>({
    key: "googlelogin",
    default: undefined,
});

export const paramsState = atom({
    key: "paramsState",
    default: "",
})
export const applicantNameState = atom({
    key: "applicantNameState",
    default: "",
})
export const myEvalIdState = atom({
    key: "myEvalIdState",
    default: "",
})
export const myEvalNameState = atom({
    key: "myEvalNameState",
    default: "",
})