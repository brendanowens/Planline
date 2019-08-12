import React, {Fragment} from 'react';
import {Menu, Icon, Table, Tag, Divider} from 'antd';
import {Link, Switch} from 'react-router-dom';

import {Layout, Breadcrumb} from 'antd';
import PrivateRoute from "../../common/PrivateRoute";

import CalendarFull from "./CalendarFull";
import CalendarAdd from "./CalendarAdd";

const {Content, Sider} = Layout;

export class Messenger extends React.Component {
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
                                <Icon type="calendar" />
                                <span>Full Calendar</span>
                                <Link to="/calendar/all/"/>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Icon type="plus"/>
                                <span>Add an Event</span>
                                <Link to="/calendar/add/"/>
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

                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

export default Messenger;
