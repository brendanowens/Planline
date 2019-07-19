import React from 'react';
import {connect} from "react-redux";

export class ProjectDashboardMessaging extends React.Component {
    render() {
        return (
            <span>ProjectDashboardMessaging</span>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    project: state.projects.projects.filter(project => project.id === parseInt(ownProps.match.params.id))[0]
});

export default connect(mapStateToProps)(ProjectDashboardMessaging);
