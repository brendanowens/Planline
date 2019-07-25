import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addVendor} from "../../../actions/vendors";
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
const ASelect = makeField(Select, formItemLayout);
const ATextArea = makeField(TextArea, formItemLayout);

let VendorForm = props => {
    console.log(props);
    const {handleSubmit} = props;
    const {vendor_types} = props;
    return (<Form onSubmit={handleSubmit}>
        <Field label="Vendor Name *" name="name" component={AInput} type="text"/>
        <Field label="Type *" name="type_id" component={ASelect}>
            <Select.Option value="" disabled>-</Select.Option>
            {vendor_types.map(type => {
                return (
                    <Select.Option
                        key={type.id}
                        value={type.id}
                        label={type.name}>{type.name}
                    </Select.Option>
                );
            })}
        </Field>
        <Field label="Address Line 1 *" name="address.address_line_1" component={AInput} type="text"/>
        <Field label="Address Line 2" name="address.address_line_2" component={AInput} type="text"/>
        <Field label="City *" name="address.city" component={AInput} type="text"/>
        <Field label="State *" name="address.state" component={AInput} type="text"/>
        <Field label="Country *" name="address.country" component={AInput} type="text"/>
        <Field label="General Notes" name="general_notes" component={ATextArea} type="textarea"/>
        <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">Add Vendor</Button>
        </FormItem>
    </Form>)
};

VendorForm = reduxForm({
    form: 'contact'
})(VendorForm);

class ExportVendorForm extends React.Component {

    static propTypes = {
        addVendor: PropTypes.func.isRequired
    };

    submit = values => {
        this.props.addVendor(values);
        this.setState({
            name: "",
        });
    };

    render() {
        return <VendorForm onSubmit={this.submit} vendor_types={this.props.vendor_types}/>
    }
}

const mapStateToProps = state => ({
    vendor_types: state.vendors.vendor_types,
});

export default connect(mapStateToProps, {addVendor})(ExportVendorForm)
