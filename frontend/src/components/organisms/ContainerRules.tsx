import React from "react";
import Stack from "@mui/material/Stack/Stack";
import { ContainerRuleGifBox } from "./ContainerRuleGifBox";

export const ContainerRules = () => {
    return (
        <>
            <Stack spacing={4} direction="column" flexWrap="wrap" justifyContent="center" alignItems="center" className="container-rule-gif-box" margin={"15px"}>
            <ContainerRuleGifBox gifUrl={'https://i.pinimg.com/originals/8f/54/58/8f54583aef8be320e0cd8738177dd309.gif'} altText={'carré'} colorGif={'var(--hunterGreen)'} textRule={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas expedita, dicta quod libero hic ut inventore earum dolorum? Perferendis reprehenderit ad quae voluptas maxime eum quam amet eos quos. Necessitatibus.'} leftOrRight={"left"} />
            <ContainerRuleGifBox gifUrl={'https://i.pinimg.com/originals/8f/54/58/8f54583aef8be320e0cd8738177dd309.gif'} altText={'carré'} colorGif={'var(--hunterGreen)'} textRule={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas expedita, dicta quod libero hic ut inventore earum dolorum? Perferendis reprehenderit ad quae voluptas maxime eum quam amet eos quos. Necessitatibus.'} leftOrRight={"right"} />
            <ContainerRuleGifBox gifUrl={'https://i.pinimg.com/originals/8f/54/58/8f54583aef8be320e0cd8738177dd309.gif'} altText={'carré'} colorGif={'var(--hunterGreen)'} textRule={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas expedita, dicta quod libero hic ut inventore earum dolorum? Perferendis reprehenderit ad quae voluptas maxime eum quam amet eos quos. Necessitatibus.'} leftOrRight={"left"} />
            <ContainerRuleGifBox gifUrl={'https://i.pinimg.com/originals/8f/54/58/8f54583aef8be320e0cd8738177dd309.gif'} altText={'carré'} colorGif={'var(--hunterGreen)'} textRule={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas expedita, dicta quod libero hic ut inventore earum dolorum? Perferendis reprehenderit ad quae voluptas maxime eum quam amet eos quos. Necessitatibus.'} leftOrRight={"right"} />

            </Stack>
        </>
    );
};
