import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist()

export const UserInfoAtom = atom({
    key: "userInfo",
    default: {
        isUser: true,
        user: {
            username: "윤예원",
            userrole: "",
        },
    },
    effects_UNSTABLE: [persistAtom],
});

export const accessTokenAtom = atom<string>({
    key: "access_token",
    default: "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6IjI2IiwicG9zaXRpb24iOiJQQVJUX0xFQURFUiIsInBhcnQiOiJGUk9OVEVORCIsImlhdCI6MTcwNzkwNjc4MiwiZXhwIjoxNzA3OTkzMTgyfQ.e84gHRUOMmCKbouWC19b6cgKYccHpLJ3i7C2Qyvt7jpnl9p33BoWPk4t_0cJyX1ZDBjJAYQmwds0K1XTD-eNaQ",
    //effects_UNSTABLE: [persistAtom],
})


export const LoginCodeAtom = atom<string|undefined>({
    key: "googlelogin",
    default: undefined,
});