import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getOrgSettings, updateOrgSettings} from "../../../actions/organization";
import {Field, reduxForm} from 'redux-form'
import {Form, Input, Radio, Select, Button, DatePicker} from "antd";
import {makeField} from "../../common/makeField";

const FormItem = Form.Item;
const {TextArea} = Input;

const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 6}
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 14}
    }
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0
        },
        sm: {
            span: 14,
            offset: 6
        }
    }
};

const AInput = makeField(Input, formItemLayout);
const ATextarea = makeField(TextArea, formItemLayout);

let OrganizationSettingForm = props => {
    const {handleSubmit} = props;
    const {org_settings} = props;
    return (<Form onSubmit={handleSubmit}>
        <Field label="Company Bio" name="company_bio" component={ATextarea}/>
        <Field label="Primary Color" name="primary_color" component={AInput} type="text"/>
        <Field label="Secondary Color" name="secondary_color" component={AInput} type="text"/>
        {/*<Field label="Favicon" name="favicon" component={AInput} type="text"/>*/}
        {/*<Field label="Logo" name="logo" component={AInput} type="text"/>*/}
        <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">Save</Button>
        </FormItem>
    </Form>)
};

OrganizationSettingForm = reduxForm({
    form: 'contact'
})(OrganizationSettingForm);

class ExportOrganizationSettingForm extends React.Component {

    static propTypes = {
        updateOrgSettings: PropTypes.func.isRequired,
        getOrgSettings: PropTypes.func.isRequired
    };


    componentDidMount() {
        this.props.getOrgSettings();
    };

    submit = values => {
        console.log(values);
        this.props.updateOrgSettings(values);
        // this.setState({
        //     name: "",
        // });
    };

    render() {
        console.log(this.props);
        return <OrganizationSettingForm onSubmit={this.submit} org_settings={this.props.org_settings}/>
        // return <OrganizationSettingForm onSubmit={this.submit}/>
    }
}

const mapStateToProps = state => ({
    org_settings: state.organization.organization,
});

export default connect(mapStateToProps, {updateOrgSettings, getOrgSettings})(ExportOrganizationSettingForm)
