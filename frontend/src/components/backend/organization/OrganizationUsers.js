import React from 'react';
import {Table} from 'antd';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';


export class OrganizationUsers extends React.Component {
    render() {
        return (
            <span>Org users</span>
        );
    }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(OrganizationUsers);
