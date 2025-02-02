import React from "react";
import Stack from "@mui/material/Stack/Stack";
import { ContainerRuleGifBox } from "./ContainerRuleGifBox";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ContainerInfoGame } from "./ContainerInfoGame";
import { Grid, Typography } from "@mui/material";


export const ContainerRules = () => {
    const isSmallScreen = useMediaQuery('(max-width:800px)');

    return (
        <>
            <Stack spacing={4} direction="column" flexWrap="wrap" justifyContent="center" alignItems="center" className="container-rule-gif-box" margin={"15px"}>
            <ContainerRuleGifBox gifUrl={"/img/icons/goal.png"} altText={'carré'} colorGif={'var(--hunterGreen)'} title="Objectif du Jeu" textRule={'Reliez le mot de départ au mot cible en proposant des mots similaires. Accumulez des points basés sur la pertinence.'} leftOrRight={"left"} />
            <ContainerRuleGifBox gifUrl={"/img/icons/words-connections.png"} altText={'carré'} colorGif={'var(--hunterGreen)'} title="Proposition de Mots" textRule={'Suggérez des mots liés sémantiquement et orthographiquement aux autres mots afin de former de nouveaux liens. Soyez original et explorez des associations surprenantes.'} leftOrRight={"right"} />
            <Stack className="box-rule-grid" display={'flex'} >
                <Typography component="h3" variant="h4" marginBottom={"15px"}>
                    Exemple de jeu
                </Typography>
                <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} display={'flex'} className="gridRules">
                    <Grid >
                        <img src={"/img/rules/rules1.png"} alt={"règles"} loading="lazy" width={"420px"}/>
                    </Grid>
                    <Grid>
                        <img src={"/img/rules/rules2.png"} alt={"règles"} loading="lazy" width={"420px"}/>
                    </Grid>
                    <Grid>
                        <img src={"/img/rules/rules3.png"} alt={"règles"} loading="lazy" width={"420px"}/>
                    </Grid>
                    <Grid>
                        <img src={"/img/rules/rules4.png"} alt={"règles"} loading="lazy" width={"420px"}/>
                    </Grid>
                </Grid>
            </Stack>
            <ContainerRuleGifBox gifUrl={"/img/icons/multi.png"} altText={'carré'} colorGif={'var(--hunterGreen)'} title="Parties Multijoueurs" textRule={"Rejoignez des parties avec vos amis ou d'autres joueurs. Soyez compétitif pour gagner la partie ! Découvrez les stratégies de jeu des autres participants."} leftOrRight={"right"} />
            <ContainerRuleGifBox gifUrl={"/img/icons/end-game.png"} altText={'carré'} colorGif={'var(--hunterGreen)'} title="Fin du Jeu" textRule={"Atteignez un score spécifique, un nombre de mots ou jouez dans une limite de temps. Soyez tactique pour maximiser votre score dans les limites fixées."} leftOrRight={"left"} />
            <ContainerRuleGifBox gifUrl={"/img/icons/history.png"} altText={'carré'} colorGif={'var(--hunterGreen)'} title="Historique et Profil" textRule={"Consultez votre historique de parties et suivez vos performances. Analysez vos succès et améliorez-vous au fil du temps."} leftOrRight={isSmallScreen ? "left" : "right"} />
            <ContainerRuleGifBox gifUrl={"/img/icons/attention.png"} altText={'carré'} colorGif={'var(--hunterGreen)'} title="Attention ! " textRule={"Il est recommandé de ne pas recharger la page pour éviter de couper la partie en cours et préserver la fluidité de l'expérience. Restons courtois en évitant de recharger la page, même si cela implique de risquer une légère censure pour le bien de tous."} leftOrRight={"left"} />
            <ContainerRuleGifBox gifUrl={"/img/icons/play.png"} altText={'carré'} colorGif={'var(--hunterGreen)'} title="Jouer !" textRule={"L'objectif principal est de s'amuser et d'explorer de nouvelles associations de mots. Stimulez votre créativité et découvrez des chaînes de mots uniques."} leftOrRight={isSmallScreen ? "left" : "right"} />
            </Stack>
        </>
    );
};
