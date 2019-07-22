import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addVendorType} from "../../../actions/vendors";
import {Field, reduxForm} from 'redux-form'
import {Form, Input, Radio, Select, Checkbox, Button, DatePicker} from "antd";
import {makeField} from "../../common/makeField";

const FormItem = Form.Item;

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

let VendorTypeForm = props => {
    const {handleSubmit} = props;
    return (<form onSubmit={handleSubmit}>
        <Field label="Vendor Type Name" name="name" component={AInput} type="text"/>
        <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">Save</Button>
        </FormItem>
    </form>)
};

VendorTypeForm = reduxForm({
    form: 'contact'
})(VendorTypeForm);

class ExportVendorTypeForm extends React.Component {

    static propTypes = {
        addVendorType: PropTypes.func.isRequired
    };

    submit = values => {
        values.attributes = [];
        this.props.addVendorType(values);
        this.setState({
            name: "",
        });
    };

    render() {
        return <VendorTypeForm onSubmit={this.submit}/>
    }
}

export default connect(null, {addVendorType})(ExportVendorTypeForm)
