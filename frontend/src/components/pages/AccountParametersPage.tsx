import { CenteredTitle } from "../atoms/CenteredTitle";
import { useUserContext } from "../hooks/AppContext";
import { AccountParametersTemplate } from "../templates/AccountParametersTemplate";

export const AccountParametersPage = () => {

    const user = useUserContext();

    return (
        <>
            <CenteredTitle text={"Votre compte"}/>
            <AccountParametersTemplate user={user} />
        </>
    );
};