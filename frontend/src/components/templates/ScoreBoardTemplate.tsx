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
        { field: 'id', headerName: 'Rang', type: 'number', width: 200 },
        { field: 'username', headerName: 'Nom du joueur', type: 'string', width: 200 },
        { field: 'totalScore', headerName: 'Meilleur score', type: 'number', width: 200 }
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
            />
        </div>
      );
};
