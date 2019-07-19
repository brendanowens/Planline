import React from 'react';
import {connect} from "react-redux";

export class ProjectDashboardContacts extends React.Component {
    render() {
        return (
            <span>ProjectDashboardContacts</span>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    project: state.projects.projects.filter(project => project.id === parseInt(ownProps.match.params.id))[0]
});

export default connect(mapStateToProps)(ProjectDashboardContacts);
