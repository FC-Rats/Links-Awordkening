import { useContext } from "react";
import { SetUpGameTemplate } from "../templates/SetUpGameTemplate";
import { AppContext } from "../hooks/AppContext";


export const SetUpGamePage = () => {

    const context = useContext(AppContext);
    console.log(context?.wsgCurrent.current);


    return (
        <>
            <SetUpGameTemplate />
        </>
    );
};
