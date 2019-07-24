import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {login} from "../../../actions/auth";
import {makeField} from "../../common/makeField";
import {Button, Form, Input, Row, Col, Card, Layout} from "antd";
import {Field, reduxForm} from "redux-form";
import {getOrgSettings} from "../../../actions/organization";

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

let LoginForm = props => {
    const {handleSubmit} = props;
    const {organization} = props;
    return (
        <div>
            <Row>
                <Col xs={20} sm={16} md={12} lg={{span: 6, offset: 9}}>
                    <Card style={{marginTop: 40}}
                          cover={<img alt="logo" src={organization.logo}/>}
                    >
                        <form onSubmit={handleSubmit}>
                            <Field label="Username" name="username" component={AInput} type="text"/>
                            <Field label="Password" name="password" component={AInput} type="password"/>
                            <FormItem {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit">Login</Button>
                            </FormItem>
                            <p>Don't have an account? <Link to='/register'>Create one</Link>.</p>
                        </form>
                    </Card>
                </Col>
            </Row>
        </div>
    )
};

LoginForm = reduxForm({
    form: 'contact'
})(LoginForm);

class ExportLoginForm extends Component {

    static propTypes = {
        login: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
        getOrgSettings: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.getOrgSettings();
    };


    submit = values => {
        this.props.login(values.username, values.password);
        this.setState({
            username: "",
            password: "",
        });
    };

    render() {
        console.log(this.props);
        if (this.props.isAuthenticated) {
            return <Redirect to="/"/>
        }
        return <LoginForm onSubmit={this.submit} organization={this.props.organization}/>
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    organization: state.organization.organization
});

export default connect(mapStateToProps, {login, getOrgSettings})(ExportLoginForm)