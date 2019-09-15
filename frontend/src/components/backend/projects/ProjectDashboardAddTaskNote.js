import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form'
import {Form, Input, Button} from "antd";
import {makeField} from "../../common/makeField";
import {addProjectTaskNote} from "../../../actions/projects";

const FormItem = Form.Item;
const {TextArea} = Input;

const ATextArea = makeField(TextArea);

let ProjectDashboardTaskNoteForm = props => {
    const {handleSubmit} = props;
    return (<Form onSubmit={handleSubmit}>
        <Field placeholder="Type private note here..." name="note" component={ATextArea} type="textarea"/>
        <Button type="primary" htmlType="submit">Save Private Note</Button>
    </Form>)
};

ProjectDashboardTaskNoteForm = reduxForm({
    form: 'projectDashboardTaskNoteForm'
})(ProjectDashboardTaskNoteForm);

class ExportProjectDashboardTaskNoteForm extends React.Component {

    static propTypes = {
        addProjectTaskNote: PropTypes.func.isRequired,
    };

    submit = values => {
        values.task = this.props.task.id;
        this.props.addProjectTaskNote(values);
        this.setState({
        });
    };

    render() {
        return <ProjectDashboardTaskNoteForm onSubmit={this.submit}/>
    }
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, {addProjectTaskNote})(ExportProjectDashboardTaskNoteForm)
