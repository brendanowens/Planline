import {
    GET_VENDORS,
    ADD_VENDOR,
    DELETE_VENDOR,
    GET_VENDOR_TYPES,
    DELETE_VENDOR_TYPE,
    ADD_VENDOR_TYPE
} from "../actions/types";

const initialState = {
    vendors: [],
    vendor_types: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_VENDORS:
            return {
                ...state,
                vendors: action.payload
            };
        case DELETE_VENDOR:
            return {
                ...state,
                vendors: state.vendors.filter(vendor => vendor.id !== action.payload)
            };
        case ADD_VENDOR:
            return {
                ...state,
                vendors: [...state.vendors, action.payload]
            };
        case GET_VENDOR_TYPES:
            return {
                ...state,
                vendor_types: action.payload
            };
        case DELETE_VENDOR_TYPE:
            return {
                ...state,
                vendor_types: state.vendor_types.filter(vendor_type => vendor_type.id !== action.payload)
            };
        case ADD_VENDOR_TYPE:
            return {
                ...state,
                vendor_types: [...state.vendor_types, action.payload]
            };
        default:
            return state
    }
}