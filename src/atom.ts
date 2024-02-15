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
    default: "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6IjE2IiwicG9zaXRpb24iOiJHRU5FUkFMIiwicGFydCI6IkZST05URU5EIiwiaWF0IjoxNzA3OTcwMzUxLCJleHAiOjE3MDgwNTY3NTF9.EpJCrEwzBdN4jOtUuZAg-qCfcEaDAH-V8QHfEzubsoRyOd0zpE_Qeq3ao-2K5L2sESM1FCCNpsuN37w6t-eb_A" ,
    effects_UNSTABLE: [persistAtom],
})


export const LoginCodeAtom = atom<string|undefined>({
    key: "googlelogin",
    default: undefined,
});