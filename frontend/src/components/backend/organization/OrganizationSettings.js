import React from 'react';
import {Table} from 'antd';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {BlockPicker} from "react-color";


export class OrganizationSettings extends React.Component {
    render() {
        return (
            <div>
                <BlockPicker/>
            </div>
        );
    }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(OrganizationSettings);
