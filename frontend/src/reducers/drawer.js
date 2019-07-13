import {SHOW_DRAWER, HIDE_DRAWER} from "../actions/types";

const initialState = {
    drawer_visible: false,
    element_id: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SHOW_DRAWER:
            return {
                ...state,
                drawer_visible: true,
                element_id: action.payload
            };
        case HIDE_DRAWER:
            return {
                ...state,
                drawer_visible: false
            };
        default:
            return state
    }
}