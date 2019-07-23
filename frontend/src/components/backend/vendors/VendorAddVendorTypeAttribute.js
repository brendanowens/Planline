import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {updateVendorType} from "../../../actions/vendors";
import {Field, reduxForm} from 'redux-form'
import {Form, Input, Select, Button} from "antd";
import {makeField} from "../../common/makeField";

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 6}
    },
    wrapperCol: {
        xs: {span: 10},
        sm: {span: 10}
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
            offset: 0
        }
    }
};

const AInput = makeField(Input, formItemLayout);
const ASelect = makeField(Select, formItemLayout);

let VendorAttributeForm = props => {
    const {handleSubmit} = props;
    return (<Form onSubmit={handleSubmit}>
        <Field placeholder="Attribute Name" name="name" component={AInput} type="text"/>
        <Field placeholder="Field Type" name="datatype" component={ASelect}>
            <Select.Option value="text">Text</Select.Option>
            <Select.Option value="date">Date</Select.Option>
            <Select.Option value="float">Decimal Number</Select.Option>
            <Select.Option value="int">Whole Number</Select.Option>
            <Select.Option value="bool">True/False</Select.Option>
        </Field>
        <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">Add Attribute</Button>
        </FormItem>
    </Form>)
};

VendorAttributeForm = reduxForm({
    form: 'contact'
})(VendorAttributeForm);

class ExportVendorAttributeForm extends React.Component {

    static propTypes = {
        addVendorType: PropTypes.func.isRequired
    };

    submit = values => {
        let attribute = values;
        let vendor_type = this.props.drawer.object;
        vendor_type.attributes.push(attribute);
        this.props.updateVendorType(vendor_type);
        this.props.drawer.object = vendor_type;
        this.setState({
            name: "",
            datatype: "",
        });
    };

    render() {
        return <VendorAttributeForm onSubmit={this.submit}/>
    }
}

const mapStateToProps = state => ({
    drawer: state.drawer
});

export default connect(mapStateToProps, {updateVendorType})(ExportVendorAttributeForm)
