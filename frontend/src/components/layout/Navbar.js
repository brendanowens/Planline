import React from 'react';
import {Menu, Icon, Avatar, Badge} from 'antd';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from "../../actions/auth";
import {Link} from 'react-router-dom';

import {Layout} from 'antd';

const {SubMenu} = Menu;
const {Header} = Layout;

export class MyHeader extends React.Component {
    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired
    };

    handleClick = e => {
        this.setState({
            current: e.key,
        });
    };

    render() {
        const {isAuthenticated, user} = this.props.auth;

        return (
            <Header className="header">
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    style={{lineHeight: '64px'}}
                >
                    <Menu.Item key="1">
                        <Icon type="unordered-list"/>
                        <span>Master Timeline</span>
                        <Link to={'/'}/>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Icon type="solution"/>
                        <span>Projects</span>
                        <Link to={'/projects'}/>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Icon type="team"/>
                        <span>Clients</span>
                        <Link to={'/'}/>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Icon type="shop"/>
                        <span>Vendors</span>
                        <Link to={'/vendors'}/>
                    </Menu.Item>
                    <Menu.Item key="5">
                        <Icon type="calendar"/>
                        <span>Calendar</span>
                        <Link to={'/calendar'}/>
                    </Menu.Item>
                    <Menu.Item key="6">
                        <Icon type="copy"/>
                        <span>Project Templates</span>
                        <Link to={'/'}/>
                    </Menu.Item>
                    <Menu.Item key="7">
                        <Icon type="message"/>
                        <span>Messaging</span>
                        <Link to={'/'}/>
                    </Menu.Item>
                    <SubMenu
                        title={
                            <span className="submenu-title-wrapper">
                                <Avatar icon="user"/> {user ? `${user.username}` : ''}
                                </span>
                        }
                        style={{float: "right"}}
                    >
                        <Menu.Item key="account:1" onClick={this.props.logout}>Logout</Menu.Item>
                        <Menu.Item key="account:2">
                            <span>Organization Settings</span>
                            <Link to={'/settings'}/>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </Header>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {logout})(MyHeader);
