import React from 'react';
import {connect} from "react-redux";
import {Calendar} from "antd";

function onPanelChange(value, mode) {
    console.log(value, mode);
}

export class ProjectDashboardCalendar extends React.Component {
    render() {
        return (
            <Calendar onPanelChange={onPanelChange}/>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    project: state.projects.projects.filter(project => project.id === parseInt(ownProps.match.params.id))[0]
});

export default connect(mapStateToProps)(ProjectDashboardCalendar);
