import { CenteredTitle } from "../atoms/CenteredTitle";
import { useUserContext } from "../hooks/AppContext";
import { AccountParametersTemplate } from "../templates/AccountParametersTemplate";

export const AccountParametersPage = () => {

    const {user} = useUserContext();

    if (!user) {
        return <div>Loading...</div>; // ou un autre composant de chargement/erreur
    }
    return ( 
        <>
            <CenteredTitle text={"Votre compte"}/>
            <AccountParametersTemplate user={user} />
        </>
    );
};