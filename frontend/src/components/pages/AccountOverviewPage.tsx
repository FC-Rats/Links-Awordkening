import { AccountOverviewTemplate } from "../templates/AccountOverviewTemplate";
import { AccountStatProps } from "../types/AccountStatProps";

export const AccountOverviewPage = () => {

    const tmp:AccountStatProps = {
        "statGameCount" : 2,
        "statBestScore" : 2,
        "statAverageScore" : 2,
        "statTotalScore" : 2,
        "words": ["test1", "test2"],
        "table": [],
    }

    return (
        <>
            <AccountOverviewTemplate data={tmp} />
        </>
    );
};
