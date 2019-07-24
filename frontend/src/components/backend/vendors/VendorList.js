import React from 'react';
import {Button, Drawer, Icon, Row, Table} from 'antd';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {deleteVendor, getVendors} from "../../../actions/vendors";
import {hideDrawer, showDrawer} from "../../../actions/drawer";
import AddVendorTypeForm from "./VendorAddVendorType";
import VendorAttributeForm from "./VendorAddVendorTypeAttribute";
import VendorAdd from "./VendorAdd";

export class VendorList extends React.Component {
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
            title: '',
            key: 'id',
            render: (vendor) => (
                <a onClick={this.props.deleteVendor.bind(this, vendor.id)}>Delete</a>
            ),
        },
        {
            title: '',
            // key: 'id',
            render: (vendor) => (
                <a>View Details</a>
            ),
        },
    ];

    render() {
        return (
            <div>
                <Row
                    style={{paddingBottom: '2rem'}}
                >
                    <Button onClick={this.props.showDrawer.bind(this, {'add_vendor': true})}>
                        <Icon type="plus-circle"/>
                        Add New Vendor
                    </Button>
                </Row>
                <Table dataSource={this.props.vendors} columns={this.columns} rowKey={vendor => vendor.id}/>
                <Drawer
                    width={640}
                    placement="right"
                    closable={true}
                    onClose={this.props.hideDrawer}
                    visible={this.props.drawer.drawer_visible}
                >
                    <h1>Add New Vendor</h1>
                    <p>Keep track of new or potential vendors by adding some general information about them. Once you
                        get some of this basic info entered, you'll be able to track additional info, such as vendor
                        contacts as custom attributes.</p>
                    <VendorAdd/>
                </Drawer>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    vendors: state.vendors.vendors,
    drawer: state.drawer
});

export default connect(mapStateToProps, {getVendors, deleteVendor, showDrawer, hideDrawer})(VendorList);
