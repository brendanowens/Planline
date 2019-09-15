import {
    GET_PROJECTS,
    DELETE_PROJECT,
    ADD_PROJECT,
    ADD_PROJECT_TASK,
    DELETE_PROJECT_TASK,
    UPDATE_PROJECT_TASK, ADD_PROJECT_TASK_NOTE, UPDATE_PROJECT_TASK_NOTE, DELETE_PROJECT_TASK_NOTE
} from "../actions/types";

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
            let add_project_task_project_index = state.projects.findIndex(project => project.id === parseInt(action.payload.project));
            return {
                ...state,
                projects: [
                    ...state.projects.slice(0, add_project_task_project_index),
                    {
                        ...state.projects[add_project_task_project_index],
                        tasks: [...state.projects[add_project_task_project_index].tasks, action.payload]
                    },
                    ...state.projects.slice(add_project_task_project_index + 1),
                ]
            };
        case UPDATE_PROJECT_TASK:
            let update_project_task_project_index = state.projects.findIndex(project => project.id === parseInt(action.payload.project));
            return {
                ...state,
                projects: [
                    ...state.projects.slice(0, update_project_task_project_index),
                    {
                        ...state.projects[update_project_task_project_index],
                        tasks: [...state.projects[update_project_task_project_index].tasks.filter(task => task.id !== action.payload.id), action.payload]
                    },
                    ...state.projects.slice(update_project_task_project_index + 1),
                ]
            };
        case DELETE_PROJECT_TASK:
            let delete_project_task_project_index = state.projects.findIndex(project => project.id === parseInt(action.payload.project_id));
            return {
                ...state,
                projects: [
                    ...state.projects.slice(0, delete_project_task_project_index),
                    {
                        ...state.projects[delete_project_task_project_index],
                        tasks: state.projects[delete_project_task_project_index].tasks.filter(task => task.id !== action.payload.id)
                    },
                    ...state.projects.slice(delete_project_task_project_index + 1),
                ]
            };
        case ADD_PROJECT_TASK_NOTE:
            let add_project_task_note_project_index = state.projects.findIndex(project => project.id === parseInt(action.payload.project_id));
            let add_project_task_note_task_index = state.projects[add_project_task_note_project_index].tasks.findIndex(task => task.id === parseInt(action.payload.task));
            return {
                ...state,
                projects: [
                    ...state.projects.slice(0, add_project_task_note_project_index),
                    {
                        ...state.projects[add_project_task_note_project_index],
                        tasks: [
                            ...state.projects[add_project_task_note_project_index].tasks.slice(0, add_project_task_note_task_index),
                            {
                                ...state.projects[add_project_task_note_project_index].tasks[add_project_task_note_task_index],
                                notes: [...state.projects[add_project_task_note_project_index].tasks[add_project_task_note_task_index].notes, action.payload]
                            },
                            ...state.projects[add_project_task_note_project_index].tasks.slice(add_project_task_note_task_index + 1),
                        ]
                    },
                    ...state.projects.slice(add_project_task_note_project_index + 1),
                ],
            };
        case UPDATE_PROJECT_TASK_NOTE:
            let update_project_task_note_project_index = state.projects.findIndex(project => project.id === parseInt(action.payload.project_id));
            return {
                ...state,
                projects: [
                    ...state.projects.slice(0, update_project_task_note_project_index),
                    {
                        ...state.projects[update_project_task_note_project_index],
                        tasks: [...state.projects[update_project_task_note_project_index].tasks.filter(task => task.id !== action.payload.id), action.payload]
                    },
                    ...state.projects.slice(update_project_task_note_project_index + 1),
                ]
            };
        case DELETE_PROJECT_TASK_NOTE:
            let delete_project_task_note_project_index = state.projects.findIndex(project => project.id === parseInt(action.payload.project_id));
            return {
                ...state,
                projects: [
                    ...state.projects.slice(0, delete_project_task_note_project_index),
                    {
                        ...state.projects[delete_project_task_note_project_index],
                        tasks: state.projects[delete_project_task_note_project_index].tasks.filter(task => task.id !== action.payload.id)
                    },
                    ...state.projects.slice(delete_project_task_note_project_index + 1),
                ]
            };
        default:
            return state
    }
};