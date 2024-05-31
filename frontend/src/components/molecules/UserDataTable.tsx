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

export const UserDataTable = ({ data, onUserEdit }: { data: UserInfo[], onUserEdit: (user: UserInfo) => void }) => {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', type: 'number',  flex: 1, minWidth: 100 },
    { field: 'name', headerName: 'Pseudo', flex: 2, minWidth: 150 },
    { field: 'birthYear', headerName: 'Année de naissance', type: 'string',  flex: 2, minWidth: 210  },
    { field: 'email', headerName: 'Email', flex: 3, minWidth: 250  },
    { field: 'verified', headerName: 'Vérifié ?', type: 'boolean', flex: 1, minWidth: 130},
    {
      field: 'visibility', headerName: 'Visibilitée', type: 'singleSelect', flex: 1, minWidth: 140, valueOptions: [
        'PUBLIC',
        'PRIVATE',
        // 'FRIENDS',
      ],
      renderCell: (params) => renderVisibilityCell(params.value),
    },
    { field: 'admin', headerName: 'Administrateur ?', type: 'boolean', flex: 1, minWidth: 190 },
    {
      field: 'modify',
      headerName: 'Modifier le compte',
      flex: 1, minWidth: 205,
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
    birthYear: user.birthYear,
    password: user.password,
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

