import { useContext } from "react";
import { AppContext } from "../hooks/AppContext";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";

interface Score {
    username: string;
    totalScore: string;
    visibility: string;
}

export const ScoreBoardTemplate = ({ scores }: { scores: Score[]}) => {
    const context = useContext(AppContext);
    let idCounter = 1;
    
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'Rang', type: 'number', flex: 1, minWidth: 100, filterable: false},
        { field: 'username', headerName: 'Nom du joueur', type: 'string', flex: 2, minWidth: 50, filterable: false},
        { field: 'totalScore', headerName: 'Meilleur score', type: 'number', flex: 2, minWidth: 50, filterable: false }
      ];
    
      const rows: GridRowsProp = scores.map((item) => ({
        id: idCounter++,
        username: (item.visibility === 'PUBLIC' || context?.user?.name === item.username ) ? item.username : "PROFIL PRIVÉ",
        totalScore: item.totalScore
      }));

      const getRowClassName = (params: any) => {
        const podiumColors = ['gold', 'silver', 'bronze'];

        if (params.id <= 3) {
            return `podium-${podiumColors[params.id - 1]}`;
        }
        return '';
    };
    
      return (
        <div className="dataresp" style={{ height: 'auto', width: '45%', margin: 'auto'}}>
            <DataGrid
                rows={rows} 
                columns={columns}
                autoHeight 
                initialState={{}} 
                getRowClassName={getRowClassName}
                hideFooterPagination 
                disableColumnFilter
                disableColumnMenu
                disableColumnSelector
                disableColumnSorting
                disableColumnResize
            />
        </div>
      );
};
