import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Breadcrumb, Button, Drawer, Icon, Layout, Row, Table} from "antd";
import {deleteProject, getProjects} from "../../../actions/projects";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {showDrawer, hideDrawer} from "../../../actions/drawer";
import ProjectForm from './ProjectAdd'

const {Content} = Layout;

export class ProjectList extends Component {
    static propTypes = {
        showDrawer: PropTypes.func.isRequired,
        hideDrawer: PropTypes.func.isRequired,
    };

    columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Event Date',
            dataIndex: 'expected_completion_date',
            key: 'expected_completion_date',
        },
        // {
        //     title: 'Completed',
        //     dataIndex: 'completed_display',
        //     key: 'completed_display',
        // },
        // {
        //     title: '',
        //     key: 'id',
        //     render: (project) => (
        //         <a onClick={this.props.deleteProject.bind(this, project.id)}>Delete</a>
        //     ),
        // },
        {
            title: '',
            // key: '',
            render: (project) => (
                <Link to={`/projects/dashboard/${project.id}`}>
                    <Button type="primary">
                        View Project Dashboard
                        <Icon type="right"/>
                    </Button>
                </Link>
            ),
        },
    ];


    render() {
        return (
            <Layout>
                <Layout>
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
                            <Row
                                style={{paddingBottom: '2rem'}}
                            >
                                <Button onClick={this.props.showDrawer.bind(this, {})}>
                                    <Icon type="plus-circle"/>
                                    Add New Project
                                </Button>
                            </Row>
                            <Table dataSource={this.props.projects} columns={this.columns}
                                   rowKey={project => project.id}/>
                            {this.props.drawer.object !== null ?
                                <Drawer
                                    width={840}
                                    placement="right"
                                    closable={true}
                                    onClose={this.props.hideDrawer}
                                    visible={this.props.drawer.drawer_visible}
                                >
                                    <ProjectForm/>
                                </Drawer>
                                : ''}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}

const mapStateToProps = state => ({
    projects: state.projects.projects,
    drawer: state.drawer
});

export default connect(mapStateToProps, {getProjects, deleteProject, showDrawer, hideDrawer})(ProjectList);
