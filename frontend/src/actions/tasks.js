import axios from 'axios';
import {ADD_PROJECT_TASK, ADD_TASK_CATEGORY, GET_TASK_CATEGORIES} from "./types";
import {createMessage, returnErrors} from './messages';
import {tokenConfig} from "./auth";

export const getTaskCategories = () => (dispatch, getState) => {
    axios.get('/backend/api/task-categories/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_TASK_CATEGORIES,
                payload: res.data
            })
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const addTaskCategory = (task_category) => (dispatch, getState) => {
    axios.post('/backend/api/task-categories/', task_category, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({addProject: "Task category added"}));
            dispatch({
                type: ADD_TASK_CATEGORY,
                payload: res.data
            })
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};
