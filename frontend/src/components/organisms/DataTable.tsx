import * as React from 'react';
import { DataGrid, GridRowsProp, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { UserInfo } from '../types/UserInfo';
import { HistoriqueInfo } from '../types/HistoriqueInfo'; 
import '../../assets/css/DataTable.css';
import { Chip, styled } from '@mui/material';
import { BadgeOutlined } from '@mui/icons-material';

const renderVisibilityCell = (value: string) => {
    let badgeColor = '';
    switch (value) {
      case 'public':
        badgeColor = 'aqua';
        break;
      case 'private':
        badgeColor = 'red';
        break;
      case 'friends':
        badgeColor = 'green';
        break;
      default:
        badgeColor = 'transparent';
    }
    return (
      <Chip label={value} style={{ borderColor: badgeColor, color: 'var(--coffee)', fontWeight: 900
    }}   variant="outlined"/>
    );
  };
  
  const StyledVisibilityChip = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5px',
    borderRadius: '5px',
  });

export const UserDataTable = ({ data }: { data: UserInfo[] }) => {
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', type: 'number', width: 150 },
        { field: 'user_name', headerName: 'Name', width: 300 },
        { field: 'birthYear', headerName: 'Année de naissance', width: 200 },
        { field: 'email', headerName: 'Email', width: 300 },
        { field: 'verified', headerName: 'Compte vérifié', type: 'boolean', width: 250 },
        { field: 'visibility', headerName: 'Visibility', type: 'singleSelect', width: 130, valueOptions: [
            'public',
            'private',
            'friends',
          ], 
          renderCell: (params) => renderVisibilityCell(params.value),
        },
        { field: 'admin', headerName: 'Compte administrateur', type: 'boolean', width: 250 },
        { field: 'averageScore', headerName: 'Score Moyen', type: 'number', width: 200 },
    ];

    const rows: GridRowsProp = data.map((user) => ({
        id: user.id,
        email: user.email,
        user_name: user.user.name,
        tokenR: user.tokenR,
        visibility: user.visibility,
        verified: user.verified,
        admin: user.admin,
        averageScore: user.averageScore,
        birthYear: user.birthYear
    }));
    
    return (
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
                pageSizeOptions={[5, 10, 25]}/>
    );
}

export const HistoriqueDataTable = ({ data }: { data: HistoriqueInfo[] }) => {
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'date', headerName: 'Date', width: 200 },
        { field: 'name_game', headerName: 'Name Game', width: 200 },
        { field: 'type', headerName: 'Type', width: 150 },
        { field: 'score', headerName: 'Score', width: 150 },
    ];

    const rows: GridRowsProp = data.map((historique) => ({
        id: historique.id,
        date: historique.date,
        name_game: historique.name_game,
        type: historique.type,
        score: historique.score
    }));

    return (
        <div style={{ height: 300, width: '100%' }}>
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

