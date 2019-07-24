import {
    GET_ORG_SETTINGS
} from "../actions/types";

const initialState = {
    organization: {},
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ORG_SETTINGS:
            return {
                ...state,
                organization: action.payload[0]
            };
        default:
            return state
    }
}