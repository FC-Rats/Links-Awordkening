import React, { useState } from 'react'
import { LogsDataTable } from '../molecules/LogsDataTable';
import customers from '../../assets/data/customers.json';

function LogsTemplate() {

    return (
        <div>
            <LogsDataTable  data={customers} />
        </div>
    )
}

export default LogsTemplate