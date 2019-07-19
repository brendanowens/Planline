import axios from 'axios';
import {GET_PROJECTS, DELETE_PROJECT, ADD_PROJECT} from "./types";
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