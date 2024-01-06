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
    "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6IjQiLCJwb3NpdGlvbiI6IkdFTkVSQUwiLCJwYXJ0IjoiRlJPTlRFTkQiLCJpYXQiOjE3MDQ1NDUwODIsImV4cCI6MTcwNDYzMTQ4Mn0.VH4-4yxA4N3Zf40KVht-KUONAXtFyXf7ioEAxnbYbstwaab_H5JtbsiGddcCoQ3qMvytYGg9hPj0IYDeZKZ8WQ",
    effects_UNSTABLE: [persistAtom],
})


export const LoginCodeAtom = atom<string|undefined>({
    key: "googlelogin",
    default: undefined,
});