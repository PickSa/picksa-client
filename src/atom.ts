import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist()

export const UserInfoAtom = atom({
    key: "userInfo",
    default: {
        isUser: true,
        user: {
            username: "박경빈",
        },
    },
    effects_UNSTABLE: [persistAtom],
});

export const accessTokenAtom = atom<string>({
    key: "access_token",
    default: "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6IjIiLCJwb3NpdGlvbiI6IlBSRVNJREVOVCIsInBhcnQiOiJGUk9OVEVORCIsImlhdCI6MTcwNDk4NjgwNCwiZXhwIjoxNzA1MDczMjA0fQ.ZMpPNlTLKm025YZjzf9V7YG8XZ6CA38JzoGj47SowJy-fGY-WIJTGQklXagiYKevBu6hTjZm1_YNn32uVmaPhw",
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