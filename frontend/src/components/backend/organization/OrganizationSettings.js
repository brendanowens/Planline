import React from 'react';
import {Table} from 'antd';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {BlockPicker} from "react-color";
import OrganizationSettingForm from './OrganizationSettingsForm';


export class OrganizationSettings extends React.Component {
    render() {
        return (
            <div>
                <OrganizationSettingForm/>
                <BlockPicker/>
            </div>
        );
    }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(OrganizationSettings);
