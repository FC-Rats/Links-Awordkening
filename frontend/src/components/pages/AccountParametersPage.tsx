import { CenteredTitle } from "../atoms/CenteredTitle";
import { AccountParametersTemplate } from "../templates/AccountParametersTemplate";
import { UserInfo } from "../types/UserInfo";

export const AccountParametersPage = () => {

    const tmp: UserInfo = {
        "id": 1004,
        "email": "luke@gmail.com",
        "name": "Luke Skywalker",
        "profilPicture": "/img/profilepictures/coconut.jpg",
        "tokenR": "1122334455",
        "visibility": "PUBLIC",
        "verified": false,
        "admin": true,
        "averageScore": 85,
        "birthYear": "1982",
    }

    return (
        <>
            <CenteredTitle text={"Votre compte"}/>
            <AccountParametersTemplate data={tmp} />
        </>
    );
};