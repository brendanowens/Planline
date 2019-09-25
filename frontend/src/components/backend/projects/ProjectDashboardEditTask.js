import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addVendor} from "../../../actions/vendors";
import {Field, reduxForm} from 'redux-form'
import {
    Form,
    Input,
    Radio,
    Select,
    Button,
    DatePicker,
    Checkbox,
    Row,
    Col,
    Icon,
    Typography,
    Switch,
    Divider,
    List,
    Popover
} from "antd";
import {makeField} from "../../common/makeField";
import {addProjectTask, updateProjectTask} from "../../../actions/projects";
import {MessageList, Input as ChatInput} from "react-chat-elements";
import {formatRelative} from 'date-fns'
import ProjectDashboardAddTaskNote from "./ProjectDashboardAddTaskNote";
import moment from "moment";
import {isEmpty} from "../../../utils";
import {SendBirdAction} from "../../../actions/sendbird";
import {Chat} from "../../chat/Chat";
import {SendBirdEvent} from "../../chat/SendBirdEvent";
import {SendBirdConnection} from "../../chat/SendBirdConnection";

const FormItem = Form.Item;
const {TextArea} = Input;
const {Title} = Typography;
const {Paragraph} = Typography;
const {Text} = Typography;

const {MonthPicker, RangePicker} = DatePicker;

const dateFormat = 'MM/DD/YYYY';
const monthFormat = 'MM/YYYY';

const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 5}
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 19}
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

const sb = new SendBirdAction();

const chat = new Chat();

const createConnectionHandler = () => {
    const connectionManager = new SendBirdConnection();
    console.log(connectionManager);
    connectionManager.onReconnectStarted = () => {
        // Spinner.start(body);
        console.log('[SendBird JS SDK] Reconnect : Started');
        connectionManager.channel = chat.channel;
    };
    connectionManager.onReconnectSucceeded = () => {
        console.log('[SendBird JS SDK] Reconnect : Succeeded');
        // Spinner.start(body);
        chat.refresh(connectionManager.channel);
    };
    connectionManager.onReconnectFailed = () => {
        console.log('[SendBird JS SDK] Reconnect : Failed');
        connectionManager.remove();
    };
};

const createChannelEvent = () => {
    const channelEvent = new SendBirdEvent();
    console.log(channelEvent);
    channelEvent.onChannelChanged = channel => {
        if (channel._autoMarkAsRead) {
            channel.markAsRead();
        }
    };
    channelEvent.onUserEntered = (openChannel, user) => {
        if (SendBirdAction.getInstance().isCurrentUser(user)) {
            const handler = () => {
                chat.render(openChannel.url);
            };
            chat.render(openChannel.url);
        }
    };
    channelEvent.onUserJoined = (groupChannel, user) => {
        const handler = () => {
            chat.render(groupChannel.url, false);
        };
        chat.updateChatInfo(groupChannel);
    };
    channelEvent.onUserLeft = (groupChannel, user) => {
        chat.updateChatInfo(groupChannel);
    };
    channelEvent.onChannelHidden = groupChannel => {
        // chatLeft.removeGroupChannelItem(groupChannel.url);
    };
};

const AInput = makeField(Input, formItemLayout);
const APlainInput = makeField(Input);
const ASelect = makeField(Select);
const ACheckbox = makeField(Checkbox, formItemLayout);
const ATextArea = makeField(TextArea);
const ADatePicker = makeField(DatePicker);

let ProjectDashboardEditTask = props => {
    const {handleSubmit} = props;
    const {task} = props;
    const {project} = props;
    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Title level={3} editable>{task.name}</Title>
                <Title level={3}><Field label="Complete" name="complete" component={ACheckbox}/></Title>
                {/*<Field label="Visible to client" name="visible_to_client" component={ACheckbox}/>*/}
                {/*<Field name="name" component={ALargeInput} type="text"/>*/}
                {/*<Field label="Days Before Event" name="days_before_event" component={AInput} type="number"/>*/}
                <span>Complete</span>
                <Input.Group compact>
                    <Field style={{width: '100px'}} name="days_before_event" component={APlainInput}
                           type="number"/>
                    <Field component={ASelect} name='time_format' style={{width: '150px'}}>
                        <Select.Option
                            key='month'
                            value='month'
                            label='Month'>Months
                        </Select.Option>
                        <Select.Option
                            key='day'
                            value='day'
                            label='Day'>Days
                        </Select.Option>
                    </Field>
                </Input.Group>
                <span>before event</span>
                <Paragraph>(or)</Paragraph>
                <Field name='due_date' component={AInput} defaultValue={moment()}/>
                {/*<p>Due date: {task.due_date}, {task.days_before_event_display} before event</p>*/}
                <Field label="Task description" name="note" component={ATextArea} type="textarea"/>
                {/*<Paragraph editable>{task.note}</Paragraph>*/}
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
                <div style={{paddingBottom: '1.5rem'}}>
                    <Switch defaultChecked/>
                    <Text> Task visible to client</Text>
                </div>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">Save task details</Button>
                </FormItem>
            </Form>
        </div>
    )
};

ProjectDashboardEditTask = reduxForm({
    form: 'contact'
})(ProjectDashboardEditTask);

class ExportProjectDashboardEditTask extends React.Component {

    static propTypes = {
        updateProjectTask: PropTypes.func.isRequired,
    };

    componentDidMount() {
        const userid = this.props.user.username;
        const nickname = this.props.user.username;
        if (isEmpty(userid) || isEmpty(nickname)) {
            console.log('UserID and Nickname must be required.');
        }
        sb
            .connect(userid, nickname)
            .then(user => {
                console.log(user);
                createConnectionHandler();
                createChannelEvent();
                // updateGroupChannelTime();
            })
            .catch(() => {
                console.log('SendBird connection failed.');
            });
        sb
            .createGroupChannel([userid, 'bride'])
            .then(channel => {
                chat.render(channel.url, false, '#clientmessagearea2');
            });
    }

    submit = values => {
        this.props.updateProjectTask(values);
        // this.setState({});
    };

    state = {
        messages: [],
    };

    privateNoteHelpText = (
        <div>
            <Paragraph>
                Private notes are only visible to you, not your client.<br/>
                Use this area for new ideas, notes from conversations, etc.
            </Paragraph>
        </div>
    );


    render() {
        let task = this.props.project.tasks.filter(task => task.id === this.props.task_id)[0];
        return (
            <div>
                <ProjectDashboardEditTask onSubmit={this.submit} task={task} project={this.props.project}
                                          initialValues={this.props.task}/>
                <Row style={{paddingTop: '2rem'}}>
                    <Col span={12}>
                        <Title level={4}>
                            Private notes
                            <Popover content={this.privateNoteHelpText}>
                                <Icon style={{fontSize: '12px', paddingLeft: '5px'}} type="info-circle"/>
                            </Popover>
                        </Title>
                        <List
                            itemLayout="horizontal"
                            dataSource={task.notes}
                            style={{maxHeight: '270px', overflow: 'auto'}}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={item.note}
                                        description={formatRelative(new Date(item.created), new Date())}
                                    />
                                </List.Item>
                            )}
                        />
                        <ProjectDashboardAddTaskNote task={this.props.task}/>
                    </Col>
                    <Col span={12}>
                        <Title level={4}>Chat with client about this task</Title>
                        <div id='clientmessagearea2'></div>
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    // task_categories: state.tasks.task_categories,
    user: state.auth.user
});

export default connect(mapStateToProps, {updateProjectTask})(ExportProjectDashboardEditTask)
