import { DataGrid, GridRowsProp, GridColDef, GridToolbar, GridCellParams } from '@mui/x-data-grid';
import { HistoriqueInfo } from '../types/HistoriqueInfo';
import '../../assets/css/DataTable.css';

export const HistoriqueDataTable = ({ data }: { data: HistoriqueInfo[] }) => {
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID'},
        { field: 'dateTime', headerName: 'Date', flex: 1, minWidth: 120},
        { field: 'name', headerName: 'Name Game', flex: 1, minWidth: 160 },
        { field: 'type', headerName: 'Type', flex: 1, minWidth: 160 },
        { field: 'idHost', headerName: 'Host', flex: 1, minWidth: 120},
        { field: 'score', headerName: 'Score', flex: 1, minWidth: 120 },
        {
            field: 'words', headerName: 'Mots', flex: 3, minWidth: 900, renderCell: (params: GridCellParams) => {
                const value = params.value as string;

                if (typeof value === 'string') {
                    return value
                        .split(',')
                        .filter(word => word.trim() !== '' && word.trim() !== 'null' && word.trim() !== 'undefined')
                        .join(', ');
                }

                return '';
            }
        }
    ];

    const rows: GridRowsProp = data.map((historique) => ({
        id: historique.id,
        dateTime: historique.dateTime,
        name: historique.name,
        type: historique.type,
        idHost: historique.username,
        score: historique.score,
        words: historique.words
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
                    pagination: { paginationModel: { pageSize: 4 } },
                }}
                pageSizeOptions={[4, 10]} />
        </div>
    );
}