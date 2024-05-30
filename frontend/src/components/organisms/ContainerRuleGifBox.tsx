import React from "react";
import "../../assets/css/RuleBox.css";
import Stack from "@mui/material/Stack/Stack";
import { GifBox } from '../molecules/GifBox';
import { RuleBox } from '../molecules/RuleBox';
import useMediaQuery from "@mui/material/useMediaQuery";

export const ContainerRuleGifBox = (props: {gifUrl:string; altText:string; colorGif:string; textRule:string; leftOrRight:string; title:string;}) => {
    const isSmallScreen = useMediaQuery('(max-width:800px)');

    return (
        <Stack spacing={4} direction={isSmallScreen ? 'column' : 'row'} flexWrap="wrap" justifyContent="center" alignItems="center" className="container-rule-gif-box" margin={"15px"}>

            {props.leftOrRight === 'left' ? (
                <>
                    <GifBox gifUrl={props.gifUrl} altText={props.altText} color={props.colorGif} />
                    <RuleBox textRule={props.textRule} title={props.title}/>
                </>
            ) : (
                <>
                    <RuleBox textRule={props.textRule} title={props.title}/>
                    <GifBox gifUrl={props.gifUrl} altText={props.altText} color={props.colorGif} />
                </>
            )}
        </Stack>
    );
};
