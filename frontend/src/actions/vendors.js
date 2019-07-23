import axios from 'axios';
import {GET_VENDORS, DELETE_VENDOR, ADD_VENDOR, GET_VENDOR_TYPES, DELETE_VENDOR_TYPE, ADD_VENDOR_TYPE, UPDATE_VENDOR_TYPE} from "./types";
import {createMessage, returnErrors} from './messages';
import {tokenConfig} from "./auth";

export const getVendors = () => (dispatch, getState) => {
    axios.get('/backend/api/vendors/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_VENDORS,
                payload: res.data
            })
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const deleteVendor = (id) => (dispatch, getState) => {
    axios.delete(`/backend/api/vendors/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({deleteVendor: "Vendor deleted"}));
            dispatch({
                type: DELETE_VENDOR,
                payload: id
            })
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const addVendor = (vendor) => (dispatch, getState) => {
    axios.post('/backend/api/vendors/', vendor, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({addVendor: "Vendor added"}));
            dispatch({
                type: ADD_VENDOR,
                payload: res.data
            })
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const getVendorTypes = () => (dispatch, getState) => {
    axios.get('/backend/api/vendor-types/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_VENDOR_TYPES,
                payload: res.data
            })
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const deleteVendorType = (id) => (dispatch, getState) => {
    axios.delete(`/backend/api/vendor-types/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({deleteVendor: "Vendor type deleted"}));
            dispatch({
                type: DELETE_VENDOR_TYPE,
                payload: id
            })
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const addVendorType = (vendor) => (dispatch, getState) => {
    axios.post('/backend/api/vendor-types/', vendor, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({addVendor: "Vendor type added"}));
            dispatch({
                type: ADD_VENDOR_TYPE,
                payload: res.data
            })
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const updateVendorType = (vendor) => (dispatch, getState) => {
    axios.put(`/backend/api/vendor-types/${vendor.id}/`, vendor, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({addVendor: "Vendor type added"}));
            dispatch({
                type: UPDATE_VENDOR_TYPE,
                payload: res.data
            })
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};