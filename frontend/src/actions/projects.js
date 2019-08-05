import axios from 'axios';
import {
    GET_PROJECTS,
    DELETE_PROJECT,
    ADD_PROJECT,
    ADD_PROJECT_TASK,
    DELETE_PROJECT_TASK,
    UPDATE_PROJECT_TASK
} from "./types";
import {createMessage, returnErrors} from './messages';
import {tokenConfig} from "./auth";

export const getProjects = () => (dispatch, getState) => {
    axios.get('/backend/api/projects/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_PROJECTS,
                payload: res.data
            })
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const deleteProject = (id) => (dispatch, getState) => {
    axios.delete(`/backend/api/projects/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({deleteProject: "Project deleted"}));
            dispatch({
                type: DELETE_PROJECT,
                payload: id
            })
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const addProject = (project) => (dispatch, getState) => {
    axios.post('/backend/api/projects/', project, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({addProject: "Project added"}));
            dispatch({
                type: ADD_PROJECT,
                payload: res.data
            })
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const addProjectTask = (project_task) => (dispatch, getState) => {
    axios.post('/backend/api/project-tasks/', project_task, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({addProject: "Project task added"}));
            dispatch({
                type: ADD_PROJECT_TASK,
                payload: res.data
            })
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const updateProjectTask = (project_task) => (dispatch, getState) => {
    axios.put(`/backend/api/project-tasks/${project_task.id}/`, project_task, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({addProject: "Project task updated"}));
            dispatch({
                type: UPDATE_PROJECT_TASK,
                payload: res.data
            })
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const deleteProjectTask = (id, project_id) => (dispatch, getState) => {
    axios.delete(`/backend/api/project-tasks/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({addProject: "Project task deleted"}));
            dispatch({
                type: DELETE_PROJECT_TASK,
                payload: {'id': id, 'project_id': project_id}
            })
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};