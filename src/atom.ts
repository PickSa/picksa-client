import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist()

export const UserInfoAtom = atom({
    key: "userInfo",
    default: {
        isUser: true,
        user: {
            username: "윤예원",
            userrole: "회장단",
        },
    },
    effects_UNSTABLE: [persistAtom],
});

export const accessTokenAtom = atom<string>({
    key: "accesstoken",
    default: "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6IjQiLCJwb3NpdGlvbiI6IlBSRVNJREVOVCIsInBhcnQiOiJGUk9OVEVORCIsImlhdCI6MTcwNTQ4ODMyNywiZXhwIjoxNzA1NTc0NzI3fQ.wv9uOnrVHyemlty23vuGglcWK-CLdZoG5uu8YbwqB99rVapPdyW4rfSqw7_2JPdj9I_hV65eM3egoZO99kK8aw",
    //effects_UNSTABLE: [persistAtom],
})


export const LoginCodeAtom = atom<string|undefined>({
    key: "googlelogin",
    default: undefined,
});