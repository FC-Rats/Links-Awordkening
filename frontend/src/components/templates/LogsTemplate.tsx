import React, { useState } from 'react'
import { LogsDataTable } from '../molecules/LogsDataTable';
import logs from '../../assets/data/logs.json';
import { CenteredTitle } from '../atoms/CenteredTitle';

function LogsTemplate() {

    return (
        <div>
            <CenteredTitle text={'Logs du jeu'} />
            <LogsDataTable data={logs} />
        </div>
    )
}

export default LogsTemplate