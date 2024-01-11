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
    "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6IjQiLCJwb3NpdGlvbiI6IlBBUlRfTEVBREVSIiwicGFydCI6IkZST05URU5EIiwiaWF0IjoxNzA0OTc3MjI1LCJleHAiOjE3MDUwNjM2MjV9.KuPkA00-8DHkMp5sRIMWaI5Hg_68bqZQs4pC4FOTrCTQ15dU9UA7A_HkUkIAqJXAaMmo4Ulz5_ydbCoMKt4YKA",
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