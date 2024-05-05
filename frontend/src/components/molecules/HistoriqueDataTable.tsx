import { DataGrid, GridRowsProp, GridColDef, GridToolbar, GridCellParams } from '@mui/x-data-grid';
import { HistoriqueInfo } from '../types/HistoriqueInfo'; 
import '../../assets/css/DataTable.css';

export const HistoriqueDataTable = ({ data }: { data: HistoriqueInfo[] }) => {
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'date', headerName: 'Date', width: 200 },
        { field: 'name_game', headerName: 'Name Game', width: 200 },
        { field: 'type', headerName: 'Type', width: 150 },
        { field: 'players', headerName: 'Players', width: 200, renderCell: (params: GridCellParams) => {
            if (params.value === null) {
                return "";
            } else {
                return (params.value as string[]).join(', ');
            }
        }},
        { field: 'score', headerName: 'Score', width: 150 },
        { field: 'givenwords', headerName: 'Given Words', width: 200, renderCell: (params: GridCellParams) => {
            return (params.value as string[]).join(', ');
        }},
        { field: 'outputwords', headerName: 'Output Words', width: 200, renderCell: (params: GridCellParams) => {
            return (params.value as string[]).join(', ');
        }},
    ];

    const rows: GridRowsProp = data.map((historique) => ({
        id: historique.id,
        date: historique.date,
        name_game: historique.name_game,
        type: historique.type,
        players: historique.players,
        score: historique.score,
        givenwords: historique.givenwords,
        outputwords: historique.outputwords
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
                pageSizeOptions={[5, 10, 25]}/>
        </div>
    );
}

function useStyles() {
    throw new Error('Function not implemented.');
}
