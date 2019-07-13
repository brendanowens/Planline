import React, {Fragment} from 'react';
import LeadForm from './Form';
import Leads from './Leads';

export default function Dashboard() {
    return (
        <Fragment>
            <LeadForm/>
            <Leads/>
        </Fragment>
    )
}