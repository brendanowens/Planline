import {
    HIDE_DRAWER,
    SHOW_DRAWER
} from "./types";

export const showDrawer = (id) => (dispatch) => {
    dispatch({
        type: SHOW_DRAWER,
        payload: id
    });
    console.log(id);
};

export const hideDrawer = () => (dispatch) => {
    dispatch({
        type: HIDE_DRAWER,
    })
};