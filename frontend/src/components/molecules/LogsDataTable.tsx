import { DataGrid, GridRowsProp, GridColDef, GridToolbar } from '@mui/x-data-grid';
import '../../assets/css/DataTable.css';
import { LogProps } from '../types/LogProps';

export const LogsDataTable = ({ data }: { data: LogProps[]}) => {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'id', type: 'number'},
    { field: 'idUser', headerName: 'ID User', type: 'number', flex: 1, minWidth: 120 },
    { field: 'dateTime', headerName: 'Date', type: 'date', flex: 2, minWidth: 120 },
    { field: 'log', headerName: 'Log', flex: 3, minWidth: 180 },
    { field: 'ip', headerName: 'IP', flex: 3, minWidth: 200 }
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
                columns: {
                  columnVisibilityModel: {
                      id: false,
                  },
                },
                pagination: { paginationModel: { pageSize: 10 } },
            }} 
            pageSizeOptions={[5, 10]}/>
    </div>
  );
}

