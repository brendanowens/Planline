import React from 'react';
import {connect} from "react-redux";
import {SendBirdAction} from "../../../actions/sendbird";
import 'react-chat-elements/dist/main.css';
import {Chat} from "../../chat/Chat";
import {SendBirdEvent} from "../../chat/SendBirdEvent";
import {isEmpty} from '../../../utils'
import {SendBirdConnection} from "../../chat/SendBirdConnection";

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

export class ProjectDashboardMessaging extends React.Component {
    state = {
        messages: [],
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
                chat.render(channel.url, false, '#clientmessagearea');
            });
    }

    render() {
        return (
            <div>
                <div id='clientmessagearea'>

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    project: state.projects.projects.filter(project => project.id === parseInt(ownProps.match.params.id))[0],
    user: state.auth.user
});

export default connect(mapStateToProps)(ProjectDashboardMessaging);
