import React from 'react';
import {Col, Row, Statistic} from "antd";
import {Doughnut} from "react-chartjs-2";
import {connect} from "react-redux";

export class ProjectDashboardDashboard extends React.Component {
    data = {
        datasets: [
            {
                data: [2500, 6000]
            }
        ],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'Spent',
            'Remaining'
        ],
    };

    render() {
        return (
            <Row gutter={16}>
                <Col span={12}>
                    <Statistic title="Days Until Event"
                               value={this.props.project.days_until_completion}/>
                </Col>
                {/*<Col span={12}>*/}
                {/*    <Doughnut data={this.data}/>*/}
                {/*</Col>*/}
            </Row>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    project: state.projects.projects.filter(project => project.id === parseInt(ownProps.match.params.id))[0]
});

export default connect(mapStateToProps)(ProjectDashboardDashboard);
