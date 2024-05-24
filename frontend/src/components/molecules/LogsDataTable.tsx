import { DataGrid, GridRowsProp, GridColDef, GridToolbar } from '@mui/x-data-grid';
import '../../assets/css/DataTable.css';
import { LogProps } from '../types/LogProps';

export const LogsDataTable = ({ data }: { data: LogProps[]}) => {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'id', type: 'number', width: 150 },
    { field: 'idUser', headerName: 'ID User', type: 'number', width: 350 },
    { field: 'dateTime', headerName: 'Date/Heure', type: 'date', width: 350 },
    { field: 'log', headerName: 'Log', width: 400 },
    { field: 'ip', headerName: 'IP', width: 400 }
  ];

  const rows: GridRowsProp = data.map((logitem) => ({
    id: logitem.id,
    idUser: logitem.idUser,
    dateTime: new Date(logitem.dateTime),
    log: logitem.log,
    ip: logitem.ip
  }));

  return (
    <div style={{ height: 'auto', width: '100%' }}>
        <DataGrid
            rows={rows} 
            columns={columns}
            slots={{ toolbar: GridToolbar }}
            slotProps={{
                toolbar: {
                showQuickFilter: true,
                },
            }}
            initialState={{
                filter: {
            filterModel: {
                items: [],
                quickFilterValues: [],
            },
            },
                pagination: { paginationModel: { pageSize: 10 } },
            }} 
            pageSizeOptions={[5, 10]}/>
    </div>
  );
}

