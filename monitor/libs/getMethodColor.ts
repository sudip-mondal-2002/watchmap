import {Methods} from "../enums/Methods";

export const getMethodColor = (method: Methods) => {
    switch (method) {
        case Methods.GET:
            return '#00f884';
        case Methods.POST:
            return '#f7b731';
        case Methods.PUT:
            return '#3c4dff';
        case Methods.DELETE:
            return '#ff3c3c';
        case Methods.PATCH:
            return '#9c4dff';
        case Methods.COPY:
            return '#a0f731';
        case Methods.HEAD:
            return '#378791';
        case Methods.OPTIONS:
            return '#f731a0';
        case Methods.LINK:
            return '#a1aafa';
        case Methods.UNLINK:
            return '#f7b731';
        case Methods.PURGE:
            return '#1aadaf';
        case Methods.LOCK:
            return '#a731a0';
        case Methods.UNLOCK:
            return '#d7f731';
        case Methods.PROPFIND:
            return '#a7d1ff';
        case Methods.VIEW:
            return '#335855';
        default:
            return '#ffffff';

    }
}