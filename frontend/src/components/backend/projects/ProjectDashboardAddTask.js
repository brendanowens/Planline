import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addVendor} from "../../../actions/vendors";
import {Field, reduxForm} from 'redux-form'
import {Form, Input, Radio, Select, Button, DatePicker} from "antd";
import {makeField} from "../../common/makeField";
import {addProjectTask} from "../../../actions/tasks";

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

let ProjectDashboardTaskForm = props => {
    console.log(props);
    const {handleSubmit} = props;
    const {task_categories} = props;
    return (<Form onSubmit={handleSubmit}>
        <div>
            <h1>Add New Task</h1>
        </div>
        <Field label="Task Name *" name="name" component={AInput} type="text"/>
        <Field label="Days Before Event *" name="days_before_event" component={AInput} type="number"/>
        <Field label="Category *" name="category" component={ASelect}>
            <Select.Option value="" disabled>-</Select.Option>
            {task_categories.map(category => {
                    return (
                        <Select.Option
                            key={category.id}
                            value={category.id}
                            label={category.name}>{category.name}
                        </Select.Option>
                    );
                }
            )}
        </Field>
        <Field label="Notes" name="note" component={ATextArea} type="textarea"/>
        <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">Add Task</Button>
        </FormItem>
    </Form>)
};

ProjectDashboardTaskForm = reduxForm({
    form: 'contact'
})(ProjectDashboardTaskForm);

class ExportProjectDashboardTaskForm extends React.Component {

    static propTypes = {
        addProjectTask: PropTypes.func.isRequired
    };

    submit = values => {
        console.log(values);
        values.project = this.props.project.id;
        this.props.addProjectTask(values);
        this.setState({
            // name: "",
        });
    };

    render() {
        return <ProjectDashboardTaskForm onSubmit={this.submit} task_categories={this.props.task_categories}/>
    }
}

const mapStateToProps = state => ({
    task_categories: state.tasks.task_categories
});

export default connect(mapStateToProps, {addProjectTask})(ExportProjectDashboardTaskForm)
