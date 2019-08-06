import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addVendor} from "../../../actions/vendors";
import {Field, reduxForm} from 'redux-form'
import {Form, Input, Radio, Select, Button, DatePicker, Checkbox} from "antd";
import {makeField} from "../../common/makeField";
import {addProjectTask, updateProjectTask} from "../../../actions/projects";

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

const formItemLargeLayout = {
    labelCol: {
        xs: {span: 0},
        sm: {span: 0}
    },
    wrapperCol: {
        xs: {span: 40},
        sm: {span: 20}
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
const ALargeInput = makeField(Input, formItemLargeLayout);
const ASelect = makeField(Select, formItemLayout);
const ACheckbox = makeField(Checkbox, formItemLayout);
const ATextArea = makeField(TextArea, formItemLayout);

let ProjectDashboardEditTask = props => {
    const {handleSubmit} = props;
    const {task} = props;
    const {project} = props;
    return (
        <Form onSubmit={handleSubmit}>
            <Field name="name" component={ALargeInput} type="text"/>
            <Field label="Days Before Event" name="days_before_event" component={AInput} type="number"/>
            <p>Due date: {task.due_date}, {task.days_before_event_display} before event</p>
            <Field label="Notes" name="note" component={ATextArea} type="textarea"/>
            <Field label="Visible to client" name="visible_to_client" component={ACheckbox}/>
            <Field label="Complete" name="complete" component={ACheckbox}/>
            <Field
                label="Parent task"
                name="parent"
                component={ASelect}
                showSearch
                placeholder="Select a parent task"
                filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                {project.tasks.map(task => {
                        return (
                            <Select.Option
                                key={task.id}
                                value={task.id}
                                label={task.name}>{task.name}
                            </Select.Option>
                        );
                    }
                )}
            </Field>
            <FormItem {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">Save</Button>
            </FormItem>
        </Form>
    )
};

ProjectDashboardEditTask = reduxForm({
    form: 'contact'
})(ProjectDashboardEditTask);

class ExportProjectDashboardEditTask extends React.Component {

    static propTypes = {
        updateProjectTask: PropTypes.func.isRequired,
    };

    submit = values => {
        this.props.updateProjectTask(values);
        // this.setState({});
    };

    render() {
        return <ProjectDashboardEditTask onSubmit={this.submit} task={this.props.task} project={this.props.project}
                                         initialValues={this.props.task}/>
    }
}

const mapStateToProps = state => ({
    // task_categories: state.tasks.task_categories,
});

export default connect(mapStateToProps, {updateProjectTask})(ExportProjectDashboardEditTask)
