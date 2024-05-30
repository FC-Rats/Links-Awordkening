import { Grid, useMediaQuery } from "@mui/material";
import { TileAccountInfo } from "../molecules/TileAccountInfo";
import { HistoriqueDataTable } from "../molecules/HistoriqueDataTable";
import { TileTopWords } from "../molecules/TileTopWords";
import { AccountStatProps } from "../types/AccountStatProps";

export const AccountOverviewTemplate = ({ data }: { data: AccountStatProps }) => {
    const isMediumScreen = useMediaQuery('(max-width:1200px)');
    const isSmallScreen = useMediaQuery('(max-width:800px)');

    return (
       <>
       <Grid container spacing={2}>
            <Grid container item xs={isMediumScreen ? 12 : 9}>
                <Grid item xs={isSmallScreen ? 12 : 6}>
                    <TileAccountInfo title={"Partie jouées"} value={data.statGameCount} subTitle={"au total"} imgUrl={"/img/icons/Videogame asset.png"} imgAlt={"Manette de jeux"}/>
                </Grid>
                <Grid item xs={isSmallScreen ? 12 : 6}>
                    <TileAccountInfo title={"Meilleur score"} value={data.statBestScore} subTitle={"sur toutes le parties"} imgUrl={"/img/icons/Trophy.png"} imgAlt={"Trophée"}/>
                </Grid>
                <Grid item xs={isSmallScreen ? 12 : 6}>
                    <TileAccountInfo title={"Score total"} value={data.statTotalScore} subTitle={"sur total"} imgUrl={"/img/icons/Trending up.png"} imgAlt={"Ligne montante"}/>
                </Grid>
                <Grid item xs={isSmallScreen ? 12 : 6}>
                    <TileAccountInfo title={"Score moyen"} value={data.statAverageScore} subTitle={"sur toutes les parties"} imgUrl={"/img/icons/Assessment.png"} imgAlt={"Statistique"}/>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={isMediumScreen ? 12 : 3}>
                <TileTopWords words={data.words}></TileTopWords>
            </Grid>

        </Grid>       
        <HistoriqueDataTable data={data.table} />
        </>
    );
};
