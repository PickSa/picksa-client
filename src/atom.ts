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
    default: "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6IjE2IiwicG9zaXRpb24iOiJHRU5FUkFMIiwicGFydCI6IkZST05URU5EIiwiaWF0IjoxNzA3OTAwOTIzLCJleHAiOjE3MDc5ODczMjN9.UN8Ul98Z7Dlj4hc8XqsR5gE1fGR6zycPZ0b0RfinU_-NVBxHF5J6Lx362w2bBFMldS50wPdNYS1MI87LAbxdyQ",
    effects_UNSTABLE: [persistAtom],
})


export const LoginCodeAtom = atom<string|undefined>({
    key: "googlelogin",
    default: undefined,
});