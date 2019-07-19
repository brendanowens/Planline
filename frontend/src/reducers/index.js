import {combineReducers} from "redux";
import leads from './leads';
import {reducer as reduxFormReducer} from 'redux-form';
import errors from './errors'
import messages from './messages'
import auth from './auth';
import vendors from './vendors';
import drawer from './drawer';
import projects from './projects';

export default combineReducers({
    leads,
    errors,
    messages,
    auth,
    vendors,
    drawer,
    projects,
    form: reduxFormReducer,
})