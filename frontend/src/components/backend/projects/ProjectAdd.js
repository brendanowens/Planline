import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addProject} from "../../../actions/projects";
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
const ADatePicker = makeField(DatePicker, formItemLayout);

const dateFormat = "MM-DD-YYYY";

let ProjectForm = props => {
    const {handleSubmit} = props;
    return (<form onSubmit={handleSubmit}>
        <Field label="Project Name" name="name" component={AInput} type="text"/>
        <Field label="Expected Completion Date" name="expected_completion_date" component={AInput}/>
        <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">Submit</Button>
        </FormItem>
    </form>)
};

ProjectForm = reduxForm({
    form: 'contact'
})(ProjectForm);

class ExportProjectForm extends React.Component {

    static propTypes = {
        addProject: PropTypes.func.isRequired
    };

    submit = values => {
        this.props.addProject(values);
        this.setState({
            name: "",
            expected_completion_date: "",
        });
    };

    render() {
        return <ProjectForm onSubmit={this.submit}/>
    }
}

export default connect(null, {addProject})(ExportProjectForm)
