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
                <a onClick={this.props.showDrawer.bind(this, vendor)}>View Details</a>
            ),
        },
    ];

    attributeValueColumns = [
        {
            title: 'Field',
            dataIndex: 'attribute.name',
            key: 'attribute.id',
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'id',
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
                {this.props.drawer.object !== null ?
                    <Drawer
                        width={640}
                        placement="right"
                        closable={true}
                        onClose={this.props.hideDrawer}
                        visible={this.props.drawer.drawer_visible}
                    >
                        {this.props.drawer.object.add_vendor === true ?
                            <div>
                                <h1>Add New Vendor</h1>
                                <p>Keep track of new or potential vendors by adding some general information about them.
                                    Once
                                    you
                                    get some of this basic info entered, you'll be able to track additional info, such
                                    as
                                    vendor
                                    contacts as custom attributes.</p>
                                <VendorAdd/>
                            </div>
                            :
                            <div>
                                <h1>{this.props.drawer.object.name}</h1>
                                <table>
                                    <tr>
                                        <td>Type</td>
                                        <td>{this.props.drawer.object.type.name}</td>
                                    </tr>
                                    <tr>
                                        <td>Address</td>
                                        <td>{this.props.drawer.object.address.full_address}</td>
                                    </tr>
                                    <tr>
                                        <td>General Notes</td>
                                        <td>{this.props.drawer.object.general_notes}</td>
                                    </tr>
                                </table>
                                <Table columns={this.attributeValueColumns}
                                       dataSource={this.props.drawer.object.attribute_values}/>
                            </div>
                        }
                    </Drawer>
                    : ''
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    vendors: state.vendors.vendors,
    drawer: state.drawer
});

export default connect(mapStateToProps, {getVendors, deleteVendor, showDrawer, hideDrawer})(VendorList);
