import React from "react";
import { CenteredLogo } from "../atoms/CenteredLogo";
import { CaseHomePageContainer } from "../organisms/CaseHomePageContainer";
import { SubmitButton } from "../molecules/SubmitButton";
import Stack from "@mui/material/Stack/Stack";
import { createLog } from "../../services/LogServices";
import { getIp, isValidBirthYear, isValidEmail, isValidPassword, isValidUsername } from "../../services/UtilsServices";

export const HomePageTemplate = () => {
    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        /*  TEST POSTS    
        
        createScore({
            idUser: '11',
            idGame: '2',
        });

        createGame({
            idJoin: 'Ab1S',
            idHost: '11',
            name: "Nom de la partie",
            type: "MultiPlayer",
            maxPlayer: 4,
            active: 1
        });

        createUser({
            username: 'EncoreMoi',
            birthYear: '2004',
            email: 'lnalabest2@gmail.com',
            password: 'Ann1vers@ire',
        });

        createFriend({
            id_user: '11',
            id_friend : '35',
            state: 0,
        });

        createLog({
            idUser: '11',
            log: 'Vérification',
        }); 
        
        */
       
        // TESTS UTILS
       let res = await getIp();
       console.log(res); // TON IP
        
       console.log("USERNAMES")
       console.log(isValidUsername("Hel")); // TRUE
       console.log(isValidUsername("")); // FALSE
       console.log(isValidUsername("He°l")); // FALSE

       console.log("YEARS")
       console.log(isValidBirthYear(2004)); // TRUE
       console.log(isValidBirthYear(1)); // FALSE
       console.log(isValidBirthYear(154444444)); // FALSE

       console.log("EMAILS")
       console.log(isValidEmail(2004+"")); // FALSE
       console.log(isValidEmail("helena.che@out.fr")); // TRUE
       console.log(isValidEmail("lna@gmail.com")); // TRUE

       console.log("PASSWORDS")
       console.log(isValidPassword(2004+"")); // FALSE
       console.log(isValidPassword("Aaaa1444$$$$")); // TRUE
       console.log(isValidPassword("Lolola_best77")); // TRUE
    };

    return (
        <Stack spacing={5} direction="column" flexWrap="wrap" justifyContent="center" alignItems="center">
            <CenteredLogo />
            <form onSubmit={handleSubmit}>
                <SubmitButton text={"Jouer"} />
            </form>
            {/* TODO changer par un RedirectButton quand les routeurs seront faits */}
            {/* <CaseHomePageContainer /> */}
        </Stack>
    );
};
