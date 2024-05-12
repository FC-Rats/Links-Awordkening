import { DataGrid, GridRowsProp, GridColDef, GridToolbar, GridCellParams } from '@mui/x-data-grid';
import { UserInfo } from '../types/UserInfo';
import '../../assets/css/DataTable.css';
import { Chip, IconButton, styled } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const renderVisibilityCell = (value: string) => {
  let badgeColor = '';
  switch (value) {
    case 'PUBLIC':
      badgeColor = 'aqua';
      break;
    case 'PRIVATE':
      badgeColor = 'red';
      break;
    case 'FRIENDS':
      badgeColor = 'green';
      break;
    default:
      badgeColor = 'transparent';
  }
  return (
    <Chip label={value} style={{
      borderColor: badgeColor, color: 'var(--coffee)', fontWeight: 900
    }} variant="outlined" />
  );
};

const StyledVisibilityChip = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '5px',
  borderRadius: '5px',
});

export const UserDataTable = ({ data, onUserEdit }: { data: UserInfo[], onUserEdit: (user: UserInfo) => void }) => {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', type: 'number', width: 150 },
    { field: 'name', headerName: 'Name', width: 300 },
    { field: 'birthYear', headerName: 'Année de naissance', width: 200, type: 'string' },
    { field: 'email', headerName: 'Email', width: 300 },
    { field: 'verified', headerName: 'Compte vérifié', type: 'boolean', width: 200 },
    {
      field: 'visibility', headerName: 'Visibility', type: 'singleSelect', width: 130, valueOptions: [
        'public',
        'private',
        'friends',
      ],
      renderCell: (params) => renderVisibilityCell(params.value),
    },
    { field: 'admin', headerName: 'Compte administrateur', type: 'boolean', width: 200 },
    { field: 'averageScore', headerName: 'Score Moyen', type: 'number', width: 200 },
    {
      field: 'modify',
      headerName: 'Modifier l\'utilisateur',
      width: 200,
      renderCell: (params: GridCellParams) => (
        <IconButton onClick={() => onUserEdit(params.row)}>
          <EditIcon />
        </IconButton>
      ),
    },
  ];

  const rows: GridRowsProp = data.map((user) => ({
    id: user.id,
    email: user.email,
    name: user.name,
    tokenR: user.tokenR,
    visibility: user.visibility,
    verified: user.verified,
    admin: user.admin,
    averageScore: user.averageScore,
    birthYear: user.birthYear,
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

