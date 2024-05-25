import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { GameTemplate } from "../templates/GameTemplate";
import { Loader } from "../atoms/Loader";
import { Message } from "../types/Message";
import { AppContext, useUserContext } from "../hooks/AppContext";
import { AlertBox } from "../molecules/AlertBox";
import { SetUpGameTemplate, SetUpGameProps } from "../templates/SetUpGameTemplate";
import { ChoosingGameTemplate } from "../templates/ChoosingGameTemplate";
import { JoinRoomTemplate } from "../templates/JoinRoomTemplate";
import { WaitingRoomTemplate } from "../templates/WaitingRoomTemplate";
import { UserInfo } from "../types/UserInfo";
import { info } from "console";
import { getUserInfoById } from "../../services/UserServices";

export type StatePage = "choosing" | "creating" | "joining" | "waiting" | "gaming" | "ending";

export const GamePage = () => {
    // ================== REGION: Alert Box State ==================
    const [alertBox, setAlertBox] = useState({
        severity: "success",
        open: false,
        message: '',
    });
    // =============================================================

    // ================== REGION: Handle Alert =====================
    /**
     * @description Permet de fermer automatique l'Alertbox au bout de 4 secondes
     */
    const handleAlert = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertBox(prevState => ({
            ...prevState,
            open: false,
        }));
    };
    // =============================================================

    // ============== REGION: Navigation between templates =========
    //const [currentPage, setCurrentPage] = useState<StatePage>();
    const { currentPage } = useUserContext();
    const { updateCurrentPage } = useUserContext(); 
/*     useEffect(() => {
        updateCurrentPage("choosing");
    }, []); */
    const [isHost, setisHost] = useState(false);

    // ==================== CONSTANTES =============================
    const context = useContext(AppContext);
    const ws = useRef<WebSocket | null>(null);

    const [codeRoom, setcodeRoom] = useState({
        codeRoom: "",
      });
    
    const [infoGame, setInfoGame] = useState({
        idJoin : '',
        nameGame: '', 
        coupsRestants: '10',
        idHost: context?.user?.id, 
        type: 'multi',
        nombreJoueurs: '2',
    });

    const [players, setPlayers] = useState<UserInfo[]>();

    // ================== WEBSOCKETS & LISTENERS ===================

    useEffect(() => {
        if (!ws.current) {
            const connectToGame = async () => {
                ws.current = new WebSocket("ws://localhost:8765/game");
                ws.current.addEventListener("open", onSendData);
                ws.current.addEventListener("close", onDataClosed);
                ws.current.addEventListener("message", onDataReceived);
                ws.current.addEventListener("error", onDataError);
            };
            connectToGame();
        }
    
        return () => {
            if (ws.current) {
                ws.current.close();
                ws.current = null;
            }
        };
    }, []); 

    const onSendData = () => {
    const data = {
        action: "send_data",
        args: {
            id: context?.user?.id,
            nickname: context?.user?.name,
        },
        };
        if (ws.current) {
        ws.current.send(JSON.stringify(data));
        } else {
        console.error("WebSocket is not open. Unable to send data.");
        }
    };

    const onDataClosed = (event: CloseEvent) => {
        console.log('WebSocket closed:', event);
        // Handle WebSocket closed event
    };

        function onDataReceived(ev: MessageEvent<any>) {
            const message = JSON.parse(ev.data);
            if (message.args.return == "success") {
              switch (message.action) {
                case "send_data" : console.log("Connection établie !"); break;
                case "join_game" : enterTheWaitingRoom(message.args); break;
                case "create_game" : {
                    if (infoGame.type == 'multi') {
                        enterTheWaitingRoom(message.args);
                    } else {
                        updateCurrentPage("gaming");
                    }
                    setInfoGame((prevInfoGame) => ({ 
                        ...prevInfoGame, 
                        idJoin: message.args.idJoin 
                    }));                    
                    break;
                }
                default : console.log(message) ; break;
              }
            } else {
              setAlertBox((prevState) => ({
                ...prevState,
                severity: "error",
                open: true,
                message: message.args.msg,
            }));
        }
    }

    const onDataError = (event: Event) => {
        console.error('WebSocket error:', event);
        // Handle WebSocket error
    };

    // ================== JOINROOM TEMPLATE ===================
    const handleInputChangeJoin = (name: string, value: any) => {
        setcodeRoom({ ...codeRoom, [name]: value });
    };

    const handleSubmitJoinCode = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        console.log(codeRoom);
        const data = {
            action: "join_game",
            args: {
                game_code: codeRoom.codeRoom,
            },
        };
        ws.current?.send(JSON.stringify(data));
    };

    // ================= SET UP GAME TEMPLATE =================
    const handleInputChangeCreate = (name: string, value: any) => {
        setInfoGame(prevInfoGame => ({ 
            ...prevInfoGame, 
            [name]: value 
        }));
    };

    const handleTypeGame = (name: string) => {
        setInfoGame(prevInfoGame => {
            if (name === 'solo') {
                return { ...prevInfoGame, type: 'solo', nombreJoueurs: '1' };
            } else if (name === 'multi') {
                return { ...prevInfoGame, type: 'multi', nombreJoueurs: '2' };
            }
            return prevInfoGame;
        });
    };

    const handleSubmitCreateGame = (event: React.FormEvent) => {
        event.preventDefault();
        setisHost(true);
        setInfoGame(infoGame);
        const data = {
            action: "create_game",
            args: {
                max_player: parseInt(infoGame.nombreJoueurs),
                game_name : infoGame.nameGame
            },
          };
          ws.current?.send(JSON.stringify(data));
    };

    // ================ WAITING ROOM ==========================
    const handleStartGame = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(infoGame);
    };

    const enterTheWaitingRoom = async (args: any) => {
        console.log(args);
        if (!context?.user) {
            console.error("User context is not available");
            return;
        }
        if (args.idJoin && args.nameGame) {
            setInfoGame({
                idJoin: args.idJoin,
                nameGame: args.nameGame,
                coupsRestants: '10',
                idHost: args.idHost,
                type: 'multi',
                nombreJoueurs: args.max_player,
            });
        } else if (!args.players) {
            setPlayers([context.user]);
        } else {
            try {
                const listPlayers = await getUserInfoById(args.players);
                setPlayers(listPlayers);
            } catch (error) {
                console.error("Failed to get user info by ID:", error);
            }
        }
        updateCurrentPage("waiting");
    };
    

    return (
        <>
            {/* ================== ALERTBOX ==================== */}
            <AlertBox severity={alertBox.severity} open={alertBox.open} message={alertBox.message} handleClose={handleAlert}></AlertBox>
            {/* ================================================ */}
            {currentPage === "choosing" && <div><ChoosingGameTemplate setStatePage={updateCurrentPage} /></div>}
            {currentPage === "creating" && <div><SetUpGameTemplate infoGame={infoGame} handleTypeGame={handleTypeGame} handleInputChange={handleInputChangeCreate} handleSubmit={handleSubmitCreateGame} /></div>}
            {currentPage === "joining" && <div><JoinRoomTemplate handleInputChange={handleInputChangeJoin} handleSubmit={handleSubmitJoinCode} /></div>}
            {(currentPage === "waiting" && players != undefined) && <div><WaitingRoomTemplate isHost={isHost} players={players} handleStartGame={handleStartGame} infoGame={infoGame} /></div>}
            {currentPage === "gaming" && <div>Game in Progress...</div>}
            {currentPage === "ending" && <div>Game Over</div>}
            {currentPage && !["choosing", "creating", "joining", "waiting", "gaming", "ending"].includes(currentPage) && <div>Invalid State</div>}
        </>

    );
}