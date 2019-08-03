import {GET_PROJECTS, DELETE_PROJECT, ADD_PROJECT, ADD_PROJECT_TASK} from "../actions/types";

const initialState = {
    projects: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PROJECTS:
            return {
                ...state,
                projects: action.payload
            };
        case DELETE_PROJECT:
            return {
                ...state,
                projects: state.projects.filter(project => project.id !== action.payload)
            };
        case ADD_PROJECT:
            return {
                ...state,
                projects: [...state.projects, action.payload]
            };
        case ADD_PROJECT_TASK:
            let project_index = state.projects.findIndex(project => project.id === parseInt(action.payload.project));
            return {
                ...state,
                projects: [
                    ...state.projects.slice(0, project_index),
                    {
                        ...state.projects[project_index],
                        tasks: [...state.projects[project_index].tasks, action.payload]
                    },
                    ...state.projects.slice(project_index + 1),
                ]
            };
        default:
            return state
    }
}