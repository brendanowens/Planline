import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {login, register} from "../../../actions/auth";
import {createMessage} from "../../../actions/messages";
import {Redirect} from 'react-router-dom';
import {Button, Card, Col, Form, Input, Row} from "antd";
import {makeField} from "../../common/makeField";
import {Field, reduxForm} from "redux-form";

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

let RegisterForm = props => {
    const {handleSubmit} = props;
    return (
        <div>
            <Row>
                <Col xs={20} sm={16} md={12} lg={{span: 12, offset: 6}}>
                    <Card style={{marginTop: 40}}>
                        <form onSubmit={handleSubmit}>
                            <Field label="Username" name="username" component={AInput} type="text"/>
                            <Field label="Email" name="email" component={AInput} type="email"/>
                            <Field label="Password" name="password" component={AInput} type="password"/>
                            <Field label="Re-type Password" name="password2" component={AInput} type="password"/>
                            <FormItem {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit">Signup</Button>
                            </FormItem>
                            <p>Already have an account? <Link to='/login'>Log in</Link>.</p>
                        </form>
                    </Card>
                </Col>
            </Row>
        </div>
    )
};

RegisterForm = reduxForm({
    form: 'contact'
})(RegisterForm);

class ExportRegisterForm extends Component {

    static propTypes = {
        register: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    };


    submit = values => {
        const {username, email, password, password2} = values;
        if (password !== password2) {
            this.props.createMessage({passwordsNotMatch: "Passwords do not match"});
        } else {
            const newUser = {email, username, password};
            this.props.register(newUser);
        }
    };

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/"/>
        }
        return <RegisterForm onSubmit={this.submit}/>
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {register, createMessage})(ExportRegisterForm)