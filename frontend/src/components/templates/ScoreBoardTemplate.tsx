import { CenteredLogo } from "../atoms/CenteredLogo";
import { SubmitButton } from "../molecules/SubmitButton";
import Stack from "@mui/material/Stack/Stack";
import { getLogs } from "../../services/LogServices";
import { CaseHomePageContainer } from "../organisms/CaseHomePageContainer";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../hooks/AppContext";
import { CenteredTitle } from "../atoms/CenteredTitle";
import { DataGrid, GridColDef, GridRowsProp, GridToolbar } from "@mui/x-data-grid";

interface Score {
    username: string;
    totalScore: string;
}

export const ScoreBoardTemplate = ({ scores }: { scores: Score[]}) => {
    let idCounter = 1;
    
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'id', type: 'number', width: 200 },
        { field: 'username', headerName: 'Nom du joueur', type: 'string', width: 200 },
        { field: 'totalScore', headerName: 'son meilleur score', type: 'number', width: 200 }
      ];
    
      const rows: GridRowsProp = scores.map((item) => ({
        id: idCounter++,
        username: item.username,
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
