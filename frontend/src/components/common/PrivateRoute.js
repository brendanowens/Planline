import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import PropTypes from 'prop-types';

const PrivateRoute = ({component: Component, auth, ...rest}) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (auth.isLoading) {
                    // TODO add spinner here
                    return <h3>Loading...</h3>
                } else if (!auth.isAuthenticated) {
                    return <Redirect to="/login"/>
                } else {
                    return <Component {...props}/>;
                }
            }}
        />
    );P
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);