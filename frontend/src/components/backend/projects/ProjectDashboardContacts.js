import React from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {Button, Icon, Table} from "antd";

export class ProjectDashboardContacts extends React.Component {
    columns = [
        {
            title: 'Email',
            dataIndex: 'user.email',
            key: 'user.id',
        },
        {
            title: 'First Name',
            dataIndex: 'first_name',
            key: 'first_name',
        },
        {
            title: 'Last Name',
            dataIndex: 'last_name',
            key: 'last_name',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
    ];

    render() {
        return (
            <span>
                <Table dataSource={this.props.project.contact_list} columns={this.columns}
                       rowKey={contact => contact.id}/>
            </span>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    project: state.projects.projects.filter(project => project.id === parseInt(ownProps.match.params.id))[0]
});

export default connect(mapStateToProps)(ProjectDashboardContacts);
