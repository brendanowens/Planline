import {SHOW_DRAWER, HIDE_DRAWER, UPDATE_DRAWER} from "../actions/types";

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
                object: action.payload,
                object_id: action.payload.id
            };
        case HIDE_DRAWER:
            return {
                ...state,
                drawer_visible: false,
                object: null,
                object_id: null
            };
        default:
            return state
    }
}