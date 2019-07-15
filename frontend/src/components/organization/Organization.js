import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getLeads, deleteLead} from "../../actions/leads";
import {Table} from "antd";

class Leads extends Component {

    static propTypes = {
        leads: PropTypes.array.isRequired,
        getLeads: PropTypes.func.isRequired,
        deleteLead: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.getLeads();
    };

    columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Message',
            dataIndex: 'message',
            key: 'message',
        },
        {
            title: 'Action',
            key: 'id',
            render: (lead) => (
                <a onClick={this.props.deleteLead.bind(this, lead.id)}>Delete</a>
            ),
        },
    ];


    render() {
        return (
            <Table dataSource={this.props.leads} columns={this.columns} rowKey={lead => lead.id}/>
        )
    }
}

const mapStateToProps = state => ({
    // go to the leads reducer and get the leads variable
    leads: state.leads.leads
});

export default connect(mapStateToProps, {getLeads, deleteLead})(Leads);