import React, { useState } from "react";
import { CenteredTitle } from "../atoms/CenteredTitle";
import { ContainerInfoPlayer } from "../organisms/ContainerInfoPlayer";
import { ContainerInfoGame } from "../organisms/ContainerInfoGame";
import { ComponentListWords } from "../molecules/ComponentListWords";
import SubmitWord from "../molecules/SubmitWord";


export const SoloGame = () => {

    return (
        <>
            <CenteredTitle text="Partie Solo" />
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <ContainerInfoPlayer />
                <ContainerInfoGame />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <ComponentListWords />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div id="graph"></div>
                    <SubmitWord />
                </div>
            </div>

        </>

    );
};
