import {
    HIDE_DRAWER,
    SHOW_DRAWER
} from "./types";

export const showDrawer = (object) => (dispatch) => {
    dispatch({
        type: SHOW_DRAWER,
        payload: object
    });
};

export const hideDrawer = () => (dispatch) => {
    dispatch({
        type: HIDE_DRAWER,
    })
};