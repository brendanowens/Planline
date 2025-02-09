import React from 'react';
import {Button, Col, Divider, Drawer, Form, Icon, Input, Row, Table} from 'antd';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {deleteVendorType, getVendorTypes} from "../../../actions/vendors";
import {showDrawer, hideDrawer} from "../../../actions/drawer";
import AddVendorTypeForm from "./VendorAddVendorType"
import VendorAttributeForm from "./VendorAddVendorTypeAttribute"

export class VendorList extends React.Component {
    static propTypes = {
        vendor_types: PropTypes.array.isRequired,
        deleteVendorType: PropTypes.func.isRequired,
        showDrawer: PropTypes.func.isRequired,
        hideDrawer: PropTypes.func.isRequired,
    };


    columns = [
        {
            title: 'Type',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Number of Fields',
            dataIndex: 'number_of_attributes',
            key: 'number_of_attributes',
        },
        {
            title: '',
            // key: 'id',
            render: (vendor_type) => (
                <a onClick={this.props.showDrawer.bind(this, vendor_type)}>View Details</a>
            ),
        },
    ];

    vendorTypeColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Field Type',
            dataIndex: 'datatype_display',
            key: 'datatype_display',
        },
        {
            title: '',
            // key: 'id',
            render: () => (
                <a href='/'>Delete</a>
            ),
        },
    ];

    render() {
        return (
            <div>
                <Row
                    style={{paddingBottom: '2rem'}}
                >
                    <Button onClick={this.props.showDrawer.bind(this, {'add_vendor_type': true})}>
                        <Icon type="plus-circle"/>
                        Add New Vendor Type
                    </Button>
                </Row>
                <p>Vendor types are categories of vendors, each of which may have its own set of custom fields for you
                    to
                    track. Click <b>View Details</b> to see the list of fields or to add additional fields.</p>
                <Table dataSource={this.props.vendor_types} columns={this.columns} rowKey={vendor => vendor.id}/>
                {this.props.drawer.object !== null ?
                    <Drawer
                        width={640}
                        placement="right"
                        closable={true}
                        onClose={this.props.hideDrawer}
                        visible={this.props.drawer.drawer_visible}
                    >
                        {this.props.drawer.object.add_vendor_type === true ?
                            <div>
                                <h1>Add New Vendor Type</h1>
                                <p>Enter an identifying name for a category of vendor. Example categories
                                    include <i>caterer</i>, <i>photographer</i>, or <i>venue</i>.</p>
                                <AddVendorTypeForm/>
                            </div>
                            :
                            <div>
                                <Row>
                                    <h1>{this.props.drawer.object.name}</h1>
                                </Row>
                                <Table pagination={false} dataSource={this.props.drawer.object.attributes}
                                       columns={this.vendorTypeColumns}
                                       rowKey={attribute => attribute.id} size="small"/>
                                <Row
                                    style={{paddingTop: '2rem'}}
                                >
                                    <VendorAttributeForm/>
                                </Row>
                            </div>
                        }
                    </Drawer>
                    : ''}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    vendor_types: state.vendors.vendor_types,
    drawer: state.drawer
});

export default connect(mapStateToProps, {deleteVendorType, showDrawer, hideDrawer})(VendorList);
