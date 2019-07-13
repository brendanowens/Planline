import React from 'react';
import {Col, Divider, Drawer, Row, Table} from 'antd';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {deleteVendorType, getVendorTypes} from "../../../actions/vendors";
import {showDrawer, hideDrawer} from "../../../actions/drawer";

const pStyle = {
    fontSize: 16,
    color: 'rgba(0,0,0,0.85)',
    lineHeight: '24px',
    display: 'block',
    marginBottom: 16,
};

const DescriptionItem = ({title, content}) => (
    <div
        style={{
            fontSize: 14,
            lineHeight: '22px',
            marginBottom: 7,
            color: 'rgba(0,0,0,0.65)',
        }}
    >
        <p
            style={{
                marginRight: 8,
                display: 'inline-block',
                color: 'rgba(0,0,0,0.85)',
            }}
        >
            {title}:
        </p>
        {content}
    </div>
);

export class VendorList extends React.Component {
    static propTypes = {
        vendor_types: PropTypes.array.isRequired,
        getVendorTypes: PropTypes.func.isRequired,
        deleteVendorType: PropTypes.func.isRequired,
        showDrawer: PropTypes.func.isRequired,
        hideDrawer: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getVendorTypes();
    };


    columns = [
        {
            title: 'Type',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Number of fields',
            dataIndex: 'number_of_attributes',
            key: 'number_of_attributes',
        },
        {
            title: '',
            // key: 'id',
            render: (vendor_type) => (
                <a onClick={this.props.showDrawer.bind(this, vendor_type.id)}>Details</a>
            ),
        },
    ];

    render() {
        return (
            <div>
                <Table dataSource={this.props.vendor_types} columns={this.columns} rowKey={vendor => vendor.id}/>
                <Drawer
                    width={640}
                    placement="right"
                    closable={true}
                    onClose={this.props.hideDrawer}
                    visible={this.props.drawer.drawer_visible}
                >
                    <h1>ID: {this.props.drawer.element_id}</h1>
                    {/*<p style={pStyle}>{this.props.drawer.element_id}</p>*/}
                    {/*<p style={pStyle}>{this.props.drawer.drawer_visible ? this.props.vendor_types.find() : ''}</p>*/}
                    <Row>
                        <p>All of the info about each type of vendor will live here. You can add additional custom fields
                            from here as well. You get to add an unlimited number of custom fields, choosing from int,
                            float, choice, true/false, date, or text.</p>
                    </Row>
                    {/*<Row>*/}
                    {/*    <Col span={12}>*/}
                    {/*        <DescriptionItem title="City" content="HangZhou"/>*/}
                    {/*    </Col>*/}
                    {/*    <Col span={12}>*/}
                    {/*        <DescriptionItem title="Country" content="China🇨🇳"/>*/}
                    {/*    </Col>*/}
                    {/*</Row>*/}
                    {/*<Row>*/}
                    {/*    <Col span={12}>*/}
                    {/*        <DescriptionItem title="Birthday" content="February 2,1900"/>*/}
                    {/*    </Col>*/}
                    {/*    <Col span={12}>*/}
                    {/*        <DescriptionItem title="Website" content="-"/>*/}
                    {/*    </Col>*/}
                    {/*</Row>*/}
                    {/*<Row>*/}
                    {/*    <Col span={24}>*/}
                    {/*        <DescriptionItem*/}
                    {/*            title="Message"*/}
                    {/*            content="Make things as simple as possible but no simpler."*/}
                    {/*        />*/}
                    {/*    </Col>*/}
                    {/*</Row>*/}
                </Drawer>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    vendor_types: state.vendors.vendor_types,
    drawer: state.drawer
});

export default connect(mapStateToProps, {getVendorTypes, deleteVendorType, showDrawer, hideDrawer})(VendorList);
