import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import HeaderSider from './layout/HeaderSider';
import Dashboard from './leads/Dashboard';
import Alerts from './layout/Alerts'
import Login from './backend/accounts/Login';
import Register from './backend/accounts/Register';
import PrivateRoute from './common/PrivateRoute';

import {Provider} from 'react-redux';
import store from '../store';
import {loadUser} from '../actions/auth';

import {Provider as AlertProvider} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import MyHeader from "./layout/Navbar";
import Vendors from "./backend/vendors/Vendors";
import Calendar from "./backend/calendar/Calendar";
import {Layout} from "antd";
import Organization from "./backend/organization/Organization";
import Projects from "./backend/projects/Projects";
import ProjectDashboard from "./backend/projects/ProjectDashboard";

//Alert options
const alertOptions = {
    timeout: 3000,
    position: 'top right'
};


class App extends Component {
    componentDidMount() {
        store.dispatch(loadUser())
    }

    render() {
        return (
            <Provider store={store}>
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <Router>
                        <Layout
                            style={{
                                height: "-webkit-fill-available"
                            }}
                        >
                            <Fragment>
                                <MyHeader/>
                                <Alerts/>
                                <PrivateRoute exact path="/" component={HeaderSider}/>
                                <Route path="/register" component={Register}/>
                                <Route path="/login" component={Login}/>
                                <PrivateRoute path="/dashboard" component={Dashboard}/>
                                <PrivateRoute path="/projects" component={Projects}/>
                                <PrivateRoute path="/vendors" component={Vendors}/>
                                <PrivateRoute path="/calendar" component={Calendar}/>
                                <PrivateRoute path="/settings" component={Organization}/>
                            </Fragment>
                        </Layout>
                    </Router>
                </AlertProvider>
            </Provider>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));