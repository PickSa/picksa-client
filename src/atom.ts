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
    default: "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6IjIiLCJwb3NpdGlvbiI6IlBSRVNJREVOVCIsInBhcnQiOiJGUk9OVEVORCIsImlhdCI6MTcwNDUyMjI2NiwiZXhwIjoxNzA0NjA4NjY2fQ.VkcBWhlSdF45PfA7UDyunFpKBgeraN-Fd8O6Jp2o0lcEEmgEAQf074iiBq4r78HxDfCWB2f4jem76hxWI-FOJw",
    effects_UNSTABLE: [persistAtom],
})


export const LoginCodeAtom = atom<string|undefined>({
    key: "googlelogin",
    default: undefined,
});