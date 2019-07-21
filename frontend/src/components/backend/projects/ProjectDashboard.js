import React, {Fragment} from 'react';
import {Menu, Icon, Table, Tag, Divider, Row, Col, Statistic} from 'antd';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link, Switch} from 'react-router-dom';

import {Layout, Breadcrumb} from 'antd';
import PrivateRoute from "../../common/PrivateRoute";
import {Route} from "react-router-dom";
import {Doughnut} from "react-chartjs-2";
import ProjectDashboardTimeline from "./ProjectDashboardTimeline";
import ProjectDashboardDashboard from "./ProjectDashboardDashboard";
import ProjectDashboardCalendar from "./ProjectDashboardCalendar";
import ProjectDashboardContacts from "./ProjectDashboardContacts";
import ProjectDashboardContracts from "./ProjectDashboardContracts";
import ProjectDashboardDayOfTimeline from "./ProjectDashboardDayOfTimeline";
import ProjectDashboardInvoices from "./ProjectDashboardInvoices";
import ProjectDashboardMessaging from "./ProjectDashboardMessaging";
import ProjectDashboardSeating from "./ProjectDashboardSeating";

const {Content, Sider} = Layout;

export class ProjectDashboard extends React.Component {
    static propTypes = {
        project: PropTypes.object.isRequired
    };

    componentDidMount() {
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
                                <Icon type="dashboard"/>
                                <span>Dashboard</span>
                                <Link to={`${this.props.match.url}/`}/>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Icon type="unordered-list"/>
                                <span>Timeline</span>
                                <Link to={`/projects/dashboard/${this.props.match.params.id}/timeline/`}/>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Icon type="calendar"/>
                                <span>Calendar</span>
                                <Link to={`/projects/dashboard/${this.props.match.params.id}/calendar/`}/>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Icon type="team"/>
                                <span>Contacts</span>
                                <Link to={`/projects/dashboard/${this.props.match.params.id}/contacts/`}/>
                            </Menu.Item>
                            <Menu.Item key="5">
                                <Icon type="table"/>
                                <span>Seating</span>
                                <Link to={`/projects/dashboard/${this.props.match.params.id}/seating/`}/>
                            </Menu.Item>
                            <Menu.Item key="6">
                                <Icon type="message"/>
                                <span>Messaging</span>
                                <Link to={`/projects/dashboard/${this.props.match.params.id}/messaging/`}/>
                            </Menu.Item>
                            <Menu.Item key="7">
                                <Icon type="ordered-list"/>
                                <span>Day of Timeline</span>
                                <Link to={`/projects/dashboard/${this.props.match.params.id}/day-of-timeline/`}/>
                            </Menu.Item>
                            <Menu.Item key="8">
                                <Icon type="profile"/>
                                <span>Invoices</span>
                                <Link to={`/projects/dashboard/${this.props.match.params.id}/invoices/`}/>
                            </Menu.Item>
                            <Menu.Item key="9">
                                <Icon type="audit"/>
                                <span>Contracts</span>
                                <Link to={`/projects/dashboard/${this.props.match.params.id}/contracts/`}/>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout style={{padding: '0 24px 24px'}}>
                        {/*<Breadcrumb style={{margin: '16px 0'}}>*/}
                        {/*    <Breadcrumb.Item>Home</Breadcrumb.Item>*/}
                        {/*    <Breadcrumb.Item>Vendors</Breadcrumb.Item>*/}
                        {/*    <Breadcrumb.Item>All Vendors</Breadcrumb.Item>*/}
                        {/*</Breadcrumb>*/}
                        <div style={{margin: '16px 0'}}>
                            <h2>{this.props.project.name}</h2>
                        </div>
                        <Content
                            style={{
                                background: '#fff',
                                padding: 24,
                                margin: 0,
                            }}
                        >
                            <PrivateRoute exact path={`/projects/dashboard/:id`}
                                          component={ProjectDashboardDashboard}/>
                            <Switch>
                                <PrivateRoute path={`/projects/dashboard/:id/timeline/`}
                                              component={ProjectDashboardTimeline}/>
                                <PrivateRoute path={`/projects/dashboard/:id/calendar/`}
                                              component={ProjectDashboardCalendar}/>
                                <PrivateRoute path={`/projects/dashboard/:id/contacts/`}
                                              component={ProjectDashboardContacts}/>
                                <PrivateRoute path={`/projects/dashboard/:id/seating/`}
                                              component={ProjectDashboardSeating}/>
                                <PrivateRoute path={`/projects/dashboard/:id/messaging/`}
                                              component={ProjectDashboardMessaging}/>
                                <PrivateRoute path={`/projects/dashboard/:id/day-of-timeline/`}
                                              component={ProjectDashboardDayOfTimeline}/>
                                <PrivateRoute path={`/projects/dashboard/:id/invoices/`}
                                              component={ProjectDashboardInvoices}/>
                                <PrivateRoute path={`/projects/dashboard/:id/contracts/`}
                                              component={ProjectDashboardContracts}/>

                            </Switch>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    project: state.projects.projects.filter(project => project.id === parseInt(ownProps.match.params.id))[0]
});

export default connect(mapStateToProps)(ProjectDashboard);
