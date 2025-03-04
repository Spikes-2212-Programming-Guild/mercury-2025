import {appId} from "./Config.js";

export function setToLocalStorage(key, value) {
    localStorage.setItem(appId + key, value);
}

export function getFromLocalStorage(key) {
    return localStorage.getItem(appId + key);
}

export function removeFromLocalStorage(key) {
    return localStorage.removeItem(appId + key);
}