import { CenteredTitle } from '../atoms/CenteredTitle';
import { ContainerRules } from "../organisms/ContainerRules";

export const RulesTemplate = () => {
    return (
        <>
            <CenteredTitle text={"Règles"}/>
            <ContainerRules/>
        </>
    );
};
