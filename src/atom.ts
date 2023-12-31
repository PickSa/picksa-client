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
    default: "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6IjIiLCJwb3NpdGlvbiI6IlBSRVNJREVOVCIsInBhcnQiOiJGUk9OVEVORCIsImlhdCI6MTcwNDAxOTA5MywiZXhwIjoxNzA0MTA1NDkzfQ.JfzxRpYZNJ6BcHFU9gbb-gY8TmsWX8bMo2PBe7qMQLrWowCJONl8OYDPkSMfJGULRc38-k6uTGwaAHLvktvvqw",
    effects_UNSTABLE: [persistAtom],
})


export const LoginCodeAtom = atom<string|undefined>({
    key: "googlelogin",
    default: undefined,
});