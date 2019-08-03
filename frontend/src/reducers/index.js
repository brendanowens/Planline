import {combineReducers} from "redux";
import leads from './leads';
import {reducer as reduxFormReducer} from 'redux-form';
import errors from './errors'
import messages from './messages'
import auth from './auth';
import vendors from './vendors';
import drawer from './drawer';
import projects from './projects';
import organization from './organization';
import tasks from './tasks';

export default combineReducers({
    leads,
    errors,
    messages,
    auth,
    vendors,
    drawer,
    projects,
    organization,
    tasks,
    form: reduxFormReducer,
})