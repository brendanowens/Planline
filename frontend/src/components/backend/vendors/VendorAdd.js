import React from 'react';
import {Table} from 'antd';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {deleteVendor, getVendors} from "../../../actions/vendors";

export class VendorAdd extends React.Component {
    static propTypes = {
        vendors: PropTypes.array.isRequired,
        getVendors: PropTypes.func.isRequired,
        deleteVendor: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.getVendors();
    };

    columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Type',
            dataIndex: 'type.name',
            key: 'type',
        },
        {
            title: 'Address',
            dataIndex: 'address.full_address',
            key: 'address',
        },
        {
            title: 'Action',
            key: 'id',
            render: (vendor) => (
                <a onClick={this.props.deleteVendor.bind(this, vendor.id)}>Delete</a>
            ),
        },
    ];

    render() {
        return (
            <span>Add a vendor</span>
        );
    }
}

const mapStateToProps = state => ({
    vendors: state.vendors.vendors
});

export default connect(mapStateToProps, {getVendors, deleteVendor})(VendorAdd);
