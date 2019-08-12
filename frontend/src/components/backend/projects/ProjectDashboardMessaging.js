import React from 'react';
import {connect} from "react-redux";
import SendBird from "sendbird";

export class ProjectDashboardMessaging extends React.Component {
    componentDidMount() {
        let sb = new SendBird({appId: 'F442DA7B-D955-42A9-BED0-E0A31342B9D9'});
        sb.connect(this.props.project.id, function (user, error) {
            if (error) {
                return;
            }
        });
        sb.OpenChannel.createChannel(function (openChannel, error) {
            if (error) {
                return;
            }
        });
    };

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
