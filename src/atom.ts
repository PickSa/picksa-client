import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist()

export const UserInfoAtom = atom({
    key: "userInfo",
    default: {
        // isUser: false,
        isUser: true, //test
        user: {
            // username: "",
            username: "test", //test
        },
    },
    effects_UNSTABLE: [persistAtom],
});

export const accessTokenAtom = atom<string>({
    key: "access_token",
    // default: "",
    default: "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6IjIiLCJwb3NpdGlvbiI6IkdFTkVSQUwiLCJwYXJ0IjoiRlJPTlRFTkQiLCJpYXQiOjE3MDMzMDY3OTYsImV4cCI6MTcwMzM5MzE5Nn0.ANt1GJLvMAEJaFxQP-bqlW5DocHDfcZIaKyHo7175xChqY6c_52x32rvK1P69ROtmUjxgni8idyfyQj7KTudfw", 
    //test
    
    effects_UNSTABLE: [persistAtom],
})

export const LoginCodeAtom = atom<string|undefined>({
    key: "googlelogin",
    default: undefined,
});