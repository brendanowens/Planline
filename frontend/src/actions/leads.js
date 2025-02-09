import axios from 'axios';
import {GET_LEADS, DELETE_LEAD, ADD_LEAD, GET_ERRORS} from "./types";
import {createMessage, returnErrors} from './messages';
import {tokenConfig} from "./auth";

// GET LEADS
export const getLeads = () => (dispatch, getState) => {
    axios.get('/leads/api/leads/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_LEADS,
                payload: res.data
            })
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

// DELETE LEAD
export const deleteLead = (id) => (dispatch, getState) => {
    axios.delete(`/leads/api/leads/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({deleteLead: "Lead deleted"}));
            dispatch({
                type: DELETE_LEAD,
                payload: id
            })
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

// ADD LEAD
export const addLead = (lead) => (dispatch, getState) => {
    axios.post('/leads/api/leads/', lead, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({addLead: "Lead added"}));
            dispatch({
                type: ADD_LEAD,
                payload: res.data
            })
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};