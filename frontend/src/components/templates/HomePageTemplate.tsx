import { CenteredLogo } from "../atoms/CenteredLogo";
import { SubmitButton } from "../molecules/SubmitButton";
import Stack from "@mui/material/Stack/Stack";
import { getLogs } from "../../services/LogServices";
import { CaseHomePageContainer } from "../organisms/CaseHomePageContainer";
import { useNavigate } from "react-router-dom";

export const HomePageTemplate = () => {
    const navigate = useNavigate();
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
        

       
        // TESTS UTILS
       let res = await getIp();
       console.log(res); // TON IP
        */

       const resp = await getLogs();
       console.log(resp);
       navigate("/game");

       return 
    };

    return (
        <Stack spacing={5} direction="column" flexWrap="wrap" justifyContent="center" alignItems="center">
            <CenteredLogo />
            <form onSubmit={handleSubmit}>
                <SubmitButton text={"Jouer"} />
            </form>
            <CaseHomePageContainer />
        </Stack>
    );
};
