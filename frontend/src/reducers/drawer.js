import {SHOW_DRAWER, HIDE_DRAWER} from "../actions/types";

const initialState = {
    drawer_visible: false,
    object: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SHOW_DRAWER:
            return {
                ...state,
                drawer_visible: true,
                object: action.payload
            };
        case HIDE_DRAWER:
            return {
                ...state,
                drawer_visible: false,
                object: null
            };
        default:
            return state
    }
}