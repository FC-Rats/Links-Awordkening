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
import { PlayerInfo } from "../types/PlayerInfo";
import { TestData } from "../molecules/Graph";
import { EndGameTemplate } from "../templates/EndGameTemplate";

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
    const [currentPage, setCurrentPage] = useState<StatePage>("choosing");
    const { previousPages, goTo, goBack } = useUserContext();
    /*     useEffect(() => {
            updateCurrentPage("choosing");
        }, []); */
    const [isHost, setisHost] = useState(false);
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [hasGameStarted, setHasGameStarted] = useState(false);

    // ==================== CONSTANTES =============================
    const context = useContext(AppContext);
    const ws = useRef<WebSocket | null>(null);

    const [codeRoom, setcodeRoom] = useState({
        codeRoom: "",
    });

    const [infoGame, setInfoGame] = useState({
        idJoin: '',
        nameGame: '',
        coupsRestants: '10',
        idHost: context?.user?.id,
        type: 'multi',
        nombreJoueurs: '2',
    });

    const initialPlayerState: UserInfo[] = context?.user ? [context.user] : [];
    const [players, setPlayers] = useState<UserInfo[]>(initialPlayerState);
    const convertUserInfoToPlayerInfo = (users: UserInfo[]): PlayerInfo[] => {
        return users.map((user) => ({
            player_name: user.name,
            player_score: 0,
            player_url: user.profilPicture,
            player_isHost: infoGame.idHost == context?.user?.id ? true : false,
            player_remainingTurns: 10,
        }));
    };
    const[playersInGame,setPlayersInGame] = useState<PlayerInfo[]>(
        convertUserInfoToPlayerInfo(players)
    );
    const[coupsRestants,setcoupsRestants] = useState(10);
    
    useEffect(() => {
        setPlayersInGame(convertUserInfoToPlayerInfo(players));
    }, [players]);

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

    const onSendData = async () => {
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

    const onDataReceived = (ev: MessageEvent<any>) => {
        const message = JSON.parse(ev.data);
        if (message.args.return == "success") {
            switch (message.action) {
            case "send_data" : console.log("Connection établie !"); break;
            case "join_game" : enterTheWaitingRoom(message.args); break;
            case "create_game" : createGameSpace(message.args);break;
            case "start_game" : startGame(message.args); break;
            case "send_message" : showMessages(message.args); break;
            case "add_word" : console.log(message) ; break;
            case "new_score" : console.log(message) ; break;
            case "end_game" : sendToEndGame(message); break;
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
    const handleInputChangeJoin = async (name: string, value: any) => {
        setcodeRoom({ ...codeRoom, [name]: value });
    };

    const handleSubmitJoinCode = async (event: { preventDefault: () => void }) => {
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
    const handleInputChangeCreate = async (name: string, value: any) => {
        setInfoGame(prevInfoGame => ({ 
            ...prevInfoGame, 
            [name]: value 
        }));
    };

    const handleTypeGame = async (name: string) => {
        setInfoGame(prevInfoGame => {
            if (name === 'solo') {
                return { ...prevInfoGame, type: 'solo', nombreJoueurs: '1' };
            } else if (name === 'multi') {
                return { ...prevInfoGame, type: 'multi', nombreJoueurs: '2' };
            }
            return prevInfoGame;
        });
    };

    const handleSubmitCreateGame = async (event: React.FormEvent) => {
        event.preventDefault();
        setisHost(true);
        const data = {
            action: "create_game",
            args: {
                max_player: parseInt(infoGame.nombreJoueurs),
                game_name: infoGame.nameGame
            },
        };
        ws.current?.send(JSON.stringify(data));
    };

    // ================ WAITING ROOM ==========================
    const handleStartGame = async (event: React.FormEvent) => {
        event.preventDefault();
        const data = {
            action: "start_game",
        };
        ws.current?.send(JSON.stringify(data));
    };

    const startGame = async (args: any) => {
        console.log(args);
        handleNextPage("gaming");
    }

    const createGameSpace = async (args: any) => {
        setInfoGame((prevInfoGame) => ({
            ...prevInfoGame,
            idJoin: args.idJoin
        }));  
        if (args.type === 'multi') {
            await enterTheWaitingRoom(args);
        } else {
            const data = {
                action: "start_game",
            };
            ws.current?.send(JSON.stringify(data));
        }                  
    }

    const enterTheWaitingRoom = async (args: any) => {
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
        handleNextPage("waiting");
    };

    const handleNextPage = (newPage: StatePage) => {
        console.log("Changing page to", newPage);
        console.log("Previous page was", currentPage);
        goTo(newPage);
        setCurrentPage(newPage);
    };

    const handlePreviousPage = () => {
        console.log("Actual page was", currentPage);
        console.log("Changing page to previous :", previousPages[previousPages.length - 1]);
        setCurrentPage(previousPages[previousPages.length - 2]);
        goBack();
    };

    useEffect(() => {
        console.log(infoGame);
    }, [infoGame]);
    
    // =================== GAME ========================

    /* Tchat */
    const [messages, setMessages] = useState<Message[]>([]);
    const [textMessage, setTextMessage] = useState("");
    const [isChatVisible, setIsChatVisible] = useState(false);

    const showMessages = async (args: any) => {
        console.log(args);
        setMessages(prevMessages => [...prevMessages, 
            { nickname: args.nickname, message: args.message }
        ]);
    }

    const toggleChatVisibility = () => {
        setIsChatVisible(!isChatVisible);
    };

    const handleSubmitMessage = async () => {
        const data = {
            action: "send_message",
            args : {
                message : textMessage
            }
        };
        ws.current?.send(JSON.stringify(data));
        setTextMessage("");
    };

    const handleInputChangeMessage = (name: string, value: string) => {
        setTextMessage(value);
    };

    /* ADD WORD */
    const [newWord, setNewWord] = useState("");

    const updateGraphWithNewWord = (word: string) => {
        setNewWord(word);
        const data = {
            action: "add_word",
            args: {
                word : newWord
            },
        };
        ws.current?.send(JSON.stringify(data));
    };

    const sendToEndGame = async (args: any) => {
        console.log(args);
        handleNextPage("ending");
    }
    
    const testData: TestData = {
        WordsChart: {
            key1: ["chat", "chien", "5"],
            key2: ["chien", "poireau", "25"],
            key3: ["poireau", "souris", "49"],
            key4: ["souris", "toupie", "49"] ,
            key5: ["toupie","bloupi","14"],
            key6: ["chat","camion","25"],
            key7: ["bloupi","courir","22"],
            key8: ["rat","courir","1"],
            key9: ["rat",'voiture',"2"], 
            key10: ["voiture","a","45"],
            key11: ["a","red","95"],
            key12: ["red","blue","88"]
        }
    };

    return (
        <>
            {isDataLoading ? (
                <Loader />
            ) : (
                <>
            {/* ================== ALERTBOX ==================== */}
            <AlertBox severity={alertBox.severity} open={alertBox.open} message={alertBox.message} handleClose={handleAlert}></AlertBox>
            {/* ================================================ */}
            {currentPage === "choosing" && <div><ChoosingGameTemplate handleNextPage={handleNextPage} /></div>}
            {currentPage === "creating" && <div><SetUpGameTemplate handlePreviousPage={handlePreviousPage} infoGame={infoGame} handleTypeGame={handleTypeGame} handleInputChange={handleInputChangeCreate} handleSubmit={handleSubmitCreateGame} /></div>}
            {currentPage === "joining" && <div><JoinRoomTemplate handleInputChange={handleInputChangeJoin} handleSubmit={handleSubmitJoinCode} /></div>}
            {(currentPage === "waiting" && players != undefined) && <div><WaitingRoomTemplate handleNextPage={handleNextPage} handlePreviousPage={handlePreviousPage} isHost={isHost} players={players} handleStartGame={handleStartGame} infoGame={infoGame} /></div>}
            {(currentPage === "gaming" && playersInGame != undefined) && <div>                
                <GameTemplate 
                    graph={testData}
                    coupsRestants={coupsRestants}
                    listwords={['er','re']}
                    infoGame={infoGame}
                    players={playersInGame}
                    newWord={newWord} 
                    updateGraphWithNewWord={updateGraphWithNewWord} 
                    toggleChatVisibility={toggleChatVisibility} 
                    isChatVisible={isChatVisible} messages={messages} 
                    onInputChangeChat={handleInputChangeMessage} 
                    SumbitMessageChat={handleSubmitMessage}                
                />
                </div>}
            {currentPage === "ending" && <div><EndGameTemplate /></div>}
            {currentPage && !["choosing", "creating", "joining", "waiting", "gaming", "ending"].includes(currentPage) && <div>Invalid State</div>}
                </>
            )}
        </>
    );
}



