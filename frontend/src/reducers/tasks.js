import {GET_TASK_CATEGORIES} from "../actions/types";

const initialState = {
    task_categories: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_TASK_CATEGORIES:
            return {
                ...state,
                task_categories: action.payload
            };
        default:
            return state
    }
}