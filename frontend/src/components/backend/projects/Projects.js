import React, {Fragment} from 'react';
import {Menu, Icon, Table, Tag, Divider} from 'antd';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link, Switch} from 'react-router-dom';

import {Layout, Breadcrumb} from 'antd';
import {deleteProject, getProjects} from "../../../actions/projects";
import PrivateRoute from "../../common/PrivateRoute";
import {Route} from "react-router-dom";
import ProjectList from "./ProjectList";
import ProjectAdd from "./ProjectAdd";
import ProjectDashboard from "./ProjectDashboard";


const {Content, Sider} = Layout;

export class Projects extends React.Component {
    static propTypes = {
        projects: PropTypes.array,
        getProjects: PropTypes.func,
        deleteProject: PropTypes.func
    };

    componentDidMount() {
        this.props.getProjects();
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
            <div>
                <PrivateRoute exact path={`${this.props.match.url}`} projects={this.props.projects}
                              component={ProjectList}/>
                <Switch>
                    <PrivateRoute path={`${this.props.match.url}/all`} projects={this.props.projects}
                                  component={ProjectList}/>
                    <PrivateRoute path={`${this.props.match.url}/add`} exact component={ProjectAdd}/>
                    <PrivateRoute path={`${this.props.match.url}/dashboard/:id`}
                                  component={ProjectDashboard}/>
                    {/*<PrivateRoute path={`${this.props.match.url}/types`} exact component={VendorTypeList}/>*/}
                    {/*<PrivateRoute path={`${this.props.match.url}/search`} exact component={VendorSearch}/>*/}
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    projects: state.projects.projects,
});

export default connect(mapStateToProps, {getProjects, deleteProject})(Projects);
