import axios from 'axios';
import {GET_ORG_SETTINGS, UPDATE_ORG_SETTINGS} from "./types";
import {createMessage, returnErrors} from './messages';
import {tokenConfig} from "./auth";

// GET ORG SETTINGS
export const getOrgSettings = () => (dispatch, getState) => {
    axios.get('/backend/api/config/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_ORG_SETTINGS,
                payload: res.data
            })
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

// UPDATE ORG SETTINGS
export const updateOrgSettings = (org_settings) => (dispatch, getState) => {
    axios.put(`/backend/api/config/1/`, org_settings, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({deleteLead: "Org settings updated"}));
            dispatch({
                type: UPDATE_ORG_SETTINGS,
                payload: id
            })
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};