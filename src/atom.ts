import { atom } from "recoil";

export const UserInfoAtom = atom({
    key: "userInfo",
    default: {
        isUser: false,
        user: {
            username: "",
        },
    },
});

export const accessTokenAtom = atom<string>({
    key: "access_token",
    default: "",
})

export const LoginCodeAtom = atom<string|undefined>({
    key: "googlelogin",
    default: undefined,
});