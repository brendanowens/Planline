import React from 'react';
import {connect} from "react-redux";

export class ProjectDashboardDayOfTimeline extends React.Component {
    render() {
        return (
            <span>ProjectDashboardDayOfTimeline</span>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    project: state.projects.projects.filter(project => project.id === parseInt(ownProps.match.params.id))[0]
});

export default connect(mapStateToProps)(ProjectDashboardDayOfTimeline);
