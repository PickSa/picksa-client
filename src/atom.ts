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
    default: "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6IjIiLCJwb3NpdGlvbiI6IlBSRVNJREVOVCIsInBhcnQiOiJGUk9OVEVORCIsImlhdCI6MTcwMzU3NDc5NywiZXhwIjoxNzAzNjYxMTk3fQ.rH0tEoGLVtS2CcO067uvTAzStQWzVdD9mrl-EvOosYKxrRqnC1L95xl-VJp_mRLwu1mTMzE4kSlPBPmuOXMvog", 
    //test
    
    effects_UNSTABLE: [persistAtom],
})


export const LoginCodeAtom = atom<string|undefined>({
    key: "googlelogin",
    default: undefined,
});