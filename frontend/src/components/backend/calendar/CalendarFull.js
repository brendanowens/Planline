import React from 'react';
import {Calendar} from 'antd';

function onPanelChange(value, mode) {
    console.log(value, mode);
}

export class CalendarFull extends React.Component {
    render() {
        return (
            <Calendar onPanelChange={onPanelChange}/>
        );
    }
}

export default (CalendarFull);
