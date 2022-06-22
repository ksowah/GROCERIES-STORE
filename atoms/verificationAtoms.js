import { atom } from "recoil"

export const verificationIDAtom = atom({
    key: "verificationIDAtom",
    default: null,
})

export const globalPhoneNumber = atom({
    key: "globalPhoneNumber",
    default: null,
})

export const cart = atom({
    key: "cart",
    default: [],
})