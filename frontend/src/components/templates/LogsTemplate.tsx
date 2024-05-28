import { LogsDataTable } from '../molecules/LogsDataTable';
import { CenteredTitle } from '../atoms/CenteredTitle';
import { LogProps } from '../types/LogProps';

function LogsTemplate( { logs } : { logs: LogProps[] }) {

    return (
        <div>
            <CenteredTitle text={'Logs du jeu'} />
            <LogsDataTable data={logs} />
        </div>
    )
}

export default LogsTemplate