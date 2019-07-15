import React, {Fragment} from 'react';
import {Menu, Icon, Table, Tag, Divider} from 'antd';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link, Switch} from 'react-router-dom';

import {Layout, Breadcrumb} from 'antd';
import {deleteVendor, getVendors} from "../../../actions/vendors";
import PrivateRoute from "../../common/PrivateRoute";
import {Route} from "react-router-dom";
import VendorList from "./VendorList";
import VendorAdd from "./VendorAdd";
import VendorSearch from "./VendorSearch";
import VendorTypeList from "./VendorTypeList";

const {Content, Sider} = Layout;

function RouteNest(props) {
    return (
        <Route exact={props.exact} path={props.path} render={p => <props.component {...p} children={props.children}/>}/>
    )
}

export class Vendors extends React.Component {
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
            <Layout>
                <Layout>
                    <Sider width={200} style={{background: '#fff'}}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{height: '100%', borderRight: 0}}
                        >
                            <Menu.Item key="1">
                                <Icon type="unordered-list"/>
                                <span>All Vendors</span>
                                <Link to="/vendors/all/"/>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Icon type="plus"/>
                                <span>Add Vendor</span>
                                <Link to="/vendors/add/"/>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Icon type="tags" />
                                <span>Vendor Types</span>
                                <Link to="/vendors/types/"/>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Icon type="search"/>
                                <span>Find A Vendor</span>
                                <Link to="/vendors/search/"/>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout style={{padding: '0 24px 24px'}}>
                        <Breadcrumb style={{margin: '16px 0'}}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>Vendors</Breadcrumb.Item>
                            <Breadcrumb.Item>All Vendors</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content
                            style={{
                                background: '#fff',
                                padding: 24,
                                margin: 0,
                            }}
                        >
                            <PrivateRoute exact path={`${this.props.match.url}`} component={VendorList}/>
                            <Switch>
                                <PrivateRoute path={`${this.props.match.url}/all`} component={VendorList}/>
                                <PrivateRoute path={`${this.props.match.url}/add`} exact component={VendorAdd}/>
                                <PrivateRoute path={`${this.props.match.url}/types`} exact component={VendorTypeList}/>
                                <PrivateRoute path={`${this.props.match.url}/search`} exact component={VendorSearch}/>
                            </Switch>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

const mapStateToProps = state => ({
    vendors: state.vendors.vendors
});

export default connect(mapStateToProps, {getVendors, deleteVendor})(Vendors);
