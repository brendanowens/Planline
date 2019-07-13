import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addLead} from "../../actions/leads";
import {Field, reduxForm} from 'redux-form'
import {Form, Input, Radio, Select, Checkbox, Button, DatePicker} from "antd";
import {makeField} from "../common/makeField";

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

let LeadForm = props => {
    const {handleSubmit} = props;
    return (<form onSubmit={handleSubmit}>
        <Field label="Name" name="name" component={AInput} type="text"/>
        <Field label="Email" name="email" component={AInput} type="email"/>
        <Field label="Message" name="message" component={ATextarea} type="textarea"/>
        <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">Submit</Button>
        </FormItem>
    </form>)
};

LeadForm = reduxForm({
    form: 'contact'
})(LeadForm);

class ExportLeadForm extends React.Component {

    static propTypes = {
        addLead: PropTypes.func.isRequired
    };

    submit = values => {
        this.props.addLead(values);
        this.setState({
            name: "",
            email: "",
            message: ""
        });
    };

    render() {
        return <LeadForm onSubmit={this.submit}/>
    }
}

export default connect(null, {addLead})(ExportLeadForm)
