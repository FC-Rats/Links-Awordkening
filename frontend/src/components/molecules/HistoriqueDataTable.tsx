import { DataGrid, GridRowsProp, GridColDef, GridToolbar, GridCellParams } from '@mui/x-data-grid';
import { HistoriqueInfo } from '../types/HistoriqueInfo';
import '../../assets/css/DataTable.css';

export const HistoriqueDataTable = ({ data }: { data: HistoriqueInfo[] }) => {
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'dateTime', headerName: 'Date', width: 200 },
        { field: 'name', headerName: 'Name Game', width: 230 },
        { field: 'type', headerName: 'Type', width: 110 },
        { field: 'idHost', headerName: 'Host', width: 110 },
        { field: 'score', headerName: 'Score', width: 150 },
        {
            field: 'words', headerName: 'Mots', width: 850, renderCell: (params: GridCellParams) => {
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
                    pagination: { paginationModel: { pageSize: 5 } },
                }}
                pageSizeOptions={[5, 10]} />
        </div>
    );
}