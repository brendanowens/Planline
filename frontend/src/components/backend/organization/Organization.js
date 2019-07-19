import React, {Fragment} from 'react';
import {Menu, Icon, Table, Tag, Divider} from 'antd';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link, Switch} from 'react-router-dom';

import {Layout, Breadcrumb} from 'antd';
import {deleteVendor, getVendors} from "../../../actions/vendors";
import PrivateRoute from "../../common/PrivateRoute";
import {Route} from "react-router-dom";
import OrganizationSettings from "./OrganizationSettings";
import OrganizationUsers from "./OrganizationUsers";

const {Content, Sider} = Layout;

export class Organization extends React.Component {
    static propTypes = {
        vendors: PropTypes.array.isRequired,
        getVendors: PropTypes.func.isRequired,
        deleteVendor: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.getVendors();
    };


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
                                <Icon type="setting"/>
                                <span>Settings</span>
                                <Link to="/settings/organization/"/>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Icon type="team"/>
                                <span>Manage Users</span>
                                <Link to="/settings/users/"/>
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
                            <PrivateRoute exact path={`${this.props.match.url}`} component={OrganizationSettings}/>
                            <Switch>
                                <PrivateRoute path={`${this.props.match.url}/organization`}
                                              component={OrganizationSettings}/>
                                <PrivateRoute path={`${this.props.match.url}/users`} exact
                                              component={OrganizationUsers}/>
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

export default connect(mapStateToProps, {getVendors, deleteVendor})(Organization);
