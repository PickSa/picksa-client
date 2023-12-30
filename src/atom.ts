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
    default: "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6IjIiLCJwb3NpdGlvbiI6IlBSRVNJREVOVCIsInBhcnQiOiJGUk9OVEVORCIsImlhdCI6MTcwMzg1OTY1OCwiZXhwIjoxNzAzOTQ2MDU4fQ.7RoVxOQ_bCY4WiYoj9uFrjDCBf0P-m8-fIVZGom7PYTZ94BW9M29QEm4D62vbEKesFhdAjoLuQxqZFVkp9XtpQ",
    effects_UNSTABLE: [persistAtom],
})


export const LoginCodeAtom = atom<string|undefined>({
    key: "googlelogin",
    default: undefined,
});