import { SyntheticEvent, useContext, useEffect, useRef, useState } from "react";
import { GameTemplate } from "../templates/GameTemplate";
import { Loader } from "../atoms/Loader";
import { Message } from "../types/Message";
import { AppContext, useUserContext } from "../hooks/AppContext";
import { AlertBox } from "../molecules/AlertBox";
import { SetUpGameTemplate } from "../templates/SetUpGameTemplate";
import { ChoosingGameTemplate } from "../templates/ChoosingGameTemplate";
import { JoinRoomTemplate } from "../templates/JoinRoomTemplate";
import { WaitingRoomTemplate } from "../templates/WaitingRoomTemplate";
import { UserInfo } from "../types/UserInfo";
import { getUserInfoById } from "../../services/UserServices";
import { PlayerInfo } from "../types/PlayerInfo";
import { TestData } from "../molecules/Graph";
import { EndGameTemplate } from "../templates/EndGameTemplate";
import { useNavigate } from "react-router-dom";
import { CenteredTitle } from "../atoms/CenteredTitle";
import { createScore } from "../../services/ScoreServices";
import { createLog } from "../../services/LogServices";
import { createGame } from "../../services/GameServices";
import { info } from "console";
import { selectListFriends } from "../../services/FriendServices";
import { ContainerFriendRequestsProps } from "../types/ContainerFriendRequestsProps";
import { Alert } from "@mui/material";
import { AlertInvitationBox } from "../molecules/AlertInvitationBox";

export type StatePage = "choosing" | "creating" | "joining" | "waiting" | "gaming" | "ending";

export const GamePage = () => {
    const navigate = useNavigate();
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
    const { previousPages, goTo, goBack, resetPageGame } = useUserContext();
    /*     useEffect(() => {
            updateCurrentPage("choosing");
        }, []); */
    const [isHost, setisHost] = useState(false);
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [isBtnDisabled, setisBtnDisabled] = useState(false);
    const [dataFriends, setDataFriends] = useState<ContainerFriendRequestsProps['friends']>([]);

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
            player_id: user.id,
            player_name: user.name,
            player_score: 0,
            player_url: user.profilPicture,
            player_isHost: infoGame.idHost === context?.user?.id ? true : false,
            player_remainingTurns: 10,
        }));
    };
    const [playersInGame, setPlayersInGame] = useState<PlayerInfo[]>(
        convertUserInfoToPlayerInfo(players)
    );
    const updatePlayerScoreByName = (id: number, score: number) => {
        setPlayersInGame(prevPlayers => {
            return prevPlayers.map(player => {
                if (player.player_id === id) {
                    return {
                        ...player,
                        player_score: score
                    };
                }
                return player;
            });
        });
    };

    const [coupsRestants, setcoupsRestants] = useState(11);

    useEffect(() => {
        setPlayersInGame(convertUserInfoToPlayerInfo(players));
    }, [players]);

    // ================== WEBSOCKETS & LISTENERS ===================

    useEffect(() => {
        resetPageGame();
        if (!ws.current) {
            const connectToGame = async () => {
                const wsUrl = process.env.REACT_APP_WS_URL || "ws://localhost:8765/game";
                ws.current = new WebSocket(wsUrl); //wss://linksawordkening.fabiengilles.tf/ws/game on Fabien's server
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
        handleNextPage("choosing");
    };

    const onDataReceived = (ev: MessageEvent<any>) => {
        const message = JSON.parse(ev.data);
        setisBtnDisabled(false);
        if (message.args.return === "success") {
            switch (message.action) {
                case "send_data": console.log("Connection établie !"); break;
                case "join_game": enterTheWaitingRoom(message.args); break;
                case "create_game": createGameSpace(message.args); break;
                case "start_game": startGame(message.args); break;
                case "invite_player": sendInvitation(message.args);break;
                case "invitation_received": receiveInvitation(message.args);break;
                case "answer_invitation": alertInvitation(message.args);break;
                case "send_message": showMessages(message.args); break;
                case "add_word": updateGraphData(message.args); break;
                case "new_score": newScoreEnemy(message.args); break;
                case "end_game": sendToEndGame(message.args); break;
                case "leave_game": leaveGame(message.args); break;
                default: console.log(message); break;
            }
        } else if (message.args.return === "warning") {
            audioAddWordWarning.play();
            setAlertBox((prevState) => ({
                ...prevState,
                severity: "warning",
                open: true,
                message: message.args.msg,
            }));
        } else if (message.args.return === "info") {
            updatePlayersInWaitingRoom(message.args);
        } else {
            if (message.action === "add_word") {
                if (message.args.word) {
                    setListWords(prevListWords => [...prevListWords, message.args.word]);
                }
                if (message.args.coups > 0) {
                    audioAddWordError.play();
                    setAlertBox((prevState) => ({
                        ...prevState,
                        severity: "error",
                        open: true,
                        message: message.args.msg,
                    }));
                }
            } else if (message.action === "leave_game") {
                setAlertBox((prevState) => ({
                    ...prevState,
                    severity: "error",
                    open: true,
                    message: message.args.msg,
                }));
                handleNextPage("choosing");
            } else {
                setAlertBox((prevState) => ({
                    ...prevState,
                    severity: "error",
                    open: true,
                    message: message.args.msg,
                }));
            }
        }
    }

    const onDataError = (event: Event) => {
        console.error('WebSocket error:', event);
        handleNextPage("choosing");
    };

    // ================== JOINROOM TEMPLATE ===================
    const handleInputChangeJoin = async (name: string, value: any) => {
        setcodeRoom({ ...codeRoom, [name]: value });
    };

    const handleSubmitJoinCode = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
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
        if(name == "nombreJoueurs" && (value < 2 || value > 6) ) {
            setAlertBox((prevState) => ({
                ...prevState,
                severity: "error",
                open: true,
                message: "TU TENTES DE FAIRE QUOI ( ఠ ͟ʖ ఠ)", //easter egg
            }));
        } else {
            setInfoGame(prevInfoGame => ({
                ...prevInfoGame,
                [name]: value
            }));
        }
    };

    const handleTypeGame = async (name: string) => {
        setInfoGame(prevInfoGame => {
            if (name === 'solo') {
                return { ...prevInfoGame, type: 'solo', nombreJoueurs: '1', nameGame: 'SoloGame'};
            } else if (name === 'multi') {
                return { ...prevInfoGame, type: 'multi', nombreJoueurs: '2' };
            }
            return prevInfoGame;
        });
    };

    const handleSubmitCreateGame = async (event: React.FormEvent) => {
        event.preventDefault();
        if((parseInt(infoGame.nombreJoueurs) < 2 || parseInt(infoGame.nombreJoueurs) > 6) ) {
            setAlertBox((prevState) => ({
                ...prevState,
                severity: "error",
                open: true,
                message: "TU TENTES DE FAIRE QUOI ( ఠ ͟ʖ ఠ)",  //easter egg
            }));
        } else  {
            setisHost(true);
            const data = {
                action: "create_game",
                args: {
                    max_player: parseInt(infoGame.nombreJoueurs),
                    game_name: infoGame.nameGame
                },
            };
            ws.current?.send(JSON.stringify(data));
        }
    };

    // ================ WAITING ROOM ==========================
    const [alertInvitationBox, setAlertInvitationBox] = useState({
        severity: "info",
        open: false,
        message: '',
        idHost: '',
        idJoin:''
    });

    const handleStartGame = async (event: React.FormEvent) => {
        event.preventDefault();
        const data = {
            action: "start_game",
        };
        ws.current?.send(JSON.stringify(data));
    };

    const startGame = async (args: any) => {
        handleNextPage("gaming");
        args.players.forEach((player: number) => {
            updatePlayerScoreByName(player, args.score);
        });
        if (!context?.user) {
            console.error("User context is not available");
            return;
        }
        createLog({
            idUser: context.user.id,
            log: 'Dans une partie',
        });

        updateGraphWordChart(args.chart);
    }

    const createGameSpace = async (args: any) => {
        setInfoGame((prevInfoGame) => ({
            ...prevInfoGame,
            idJoin: args.idJoin
        }));
        if (!context?.user) {
            console.error("User context is not available");
            return;
        }
        createLog({
            idUser: context.user.id,
            log: 'Crée une partie',
        });

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
        createLog({
            idUser: context.user.id,
            log: 'A rejoint un salon',
        });
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

    const handleLeaveGame = async (event: React.FormEvent) => {
        event.preventDefault();
        const data = {
            action: "leave_game",
        };
        ws.current?.send(JSON.stringify(data));
    };

    const leaveGame = async (args: any) => {
        if (!context?.user) {
            console.error("User context is not available");
            return;
        }
        createLog({
            idUser: context.user.id,
            log: 'Quitte la partie',
        });
        if (args.msg) {
            setAlertBox((prevState) => ({
                ...prevState,
                severity: "success",
                open: true,
                message: args.msg,
            }));
        }
        handleNextPage("choosing");
    }
    
    const updatePlayersInWaitingRoom = async (args: any) => {
        if (args.msg) {
            setAlertBox((prevState) => ({
                ...prevState,
                severity: "info",
                open: true,
                message: args.msg,
            }));
        }
        if (args.players) {
            const listPlayers = await getUserInfoById(args.players);
            setPlayers(listPlayers);
        }
    };

    const handleNextPage = (newPage: StatePage) => {
        goTo(newPage);
        setCurrentPage(newPage);
    };

    const handlePreviousPage = () => {
        setCurrentPage(previousPages[previousPages.length - 2]);
        goBack();
    };

    const handleFinishPage = () => {
        setCurrentPage("choosing");
        resetPageGame();
        navigate("/");
    };

    const handlePlayAgain = () => {
        setCurrentPage("choosing");
        resetPageGame();
        window.location.reload();
    };

    const fetchFriends = async () => {
        const data = await selectListFriends(context?.user?.id || 0);
          setDataFriends(data.dataUser);
      };     
  
      /* Listes de users */
      useEffect(() => {
          fetchFriends();
      }, []);

    const inviteFriend = (id: number, nickname: string) => {
        const data = {
            action: "invite_player",
            args: {
                id: id,
                nickname : nickname
            },
        };
        ws.current?.send(JSON.stringify(data));
    };

    const alertInvitation = async (args: any) => {
        if (args.msg) {
            setAlertBox((prevState) => ({
                ...prevState,
                severity: args.return,
                open: true,
                message: args.msg,
            }));
        }
    };

    const receiveInvitation = async (args: any) => {
        if (args.msg) {
            setAlertInvitationBox((prevState) => ({
                ...prevState,
                severity: "info",
                open: true,
                message: args.msg,
                idHost: args.idInvite,
                idJoin: args.idJoin
            }));
        }
    };
        
    const sendInvitation = async (args: any) => {
        if (args.msg) {
            setAlertBox((prevState) => ({
                ...prevState,
                severity: args.warning,
                open: true,
                message: args.msg,
            }));
        }
    };

    const handleAcceptInvitation = () => {
        const data = {
            action: "answer_invitation",
            args: {
                answer : "accepted",
                id: alertInvitationBox.idHost
            },
        };
        ws.current?.send(JSON.stringify(data));
        const data2 = {
            action: "join_game",
            args: {
                game_code: alertInvitationBox.idJoin,
            },
        };
        ws.current?.send(JSON.stringify(data2));
        setAlertInvitationBox((prevState) => ({
            ...prevState,
            open: false,
        }));
    };

    const handleRefuseInvitation = () => {
        const data = {
            action: "answer_invitation",
            args: {
                answer : "refused",
                id: alertInvitationBox.idHost
            },
        };
        ws.current?.send(JSON.stringify(data));
        setAlertInvitationBox((prevState) => ({
            ...prevState,
            open: false,
        }));
    };

    // =================== GAME ========================
    const [isTimerFinished, setIsTimerFinished] = useState(false);
    const [isModalWordListVisible, setIsModalWordListVisible] = useState(false);

    /* Tchat */
    const [messages, setMessages] = useState<Message[]>([]);
    const [textMessage, setTextMessage] = useState("");
    const [isChatVisible, setIsChatVisible] = useState(false);
    const [hasNewMessage, setHasNewMessage] = useState(false);

    const showMessages = async (args: any) => {
        audioMessage.play();
        if (!context?.user) {
            console.error("User context is not available");
            return;
        }
        createLog({
            idUser: context.user.id,
            log: 'A envoyé un message',
        });
        if (!isChatVisible) setHasNewMessage(true);
        setMessages(prevMessages => [...prevMessages,
        { nickname: args.nickname, message: args.message }
        ]);
    }

    const toggleWordsListVisibility = () => {
        setIsModalWordListVisible(!isModalWordListVisible);
    };

    const toggleChatVisibility = () => {
        setIsChatVisible(!isChatVisible);
        if (isChatVisible) setHasNewMessage(false);
    };

    const handleSubmitMessage = async () => {
        const data = {
            action: "send_message",
            args: {
                message: textMessage
            }
        };
        ws.current?.send(JSON.stringify(data));
        setTextMessage("");
    };

    const handleInputChangeMessage = (name: string, value: string) => {
        setTextMessage(value);
    };

    /* ADD WORD */
    const [listWords, setListWords] = useState<string[]>([]);

    const newScoreEnemy = (args: any) => {
        updatePlayerScoreByName(args.player, args.score);
        audioNewScoreEnemy.play();
        setAlertBox((prevState) => ({
            ...prevState,
            severity: "info",
            open: true,
            message: args.msg,
        }));
    };

    const updateGraphWithNewWord = (word: string) => {
        setisBtnDisabled(true);
        const data = {
            action: "add_word",
            args: {
                word: word.trim().toLowerCase()
            },
        };
        ws.current?.send(JSON.stringify(data));
    };

    const updateGraphWordChartEndPage = (newEntries: [string, string, number][]) => {
        const updatedWordsChart: TestData = { WordsChart: {} };
        newEntries.forEach((entry, index) => {
            const newKey = `key${index + 1}`;
            updatedWordsChart.WordsChart[newKey] = [entry[0], entry[1], entry[2].toString()];
        });
        return updatedWordsChart;
    };

    const [allCharts, setAllCharts] = useState<{ [key: string]: TestData }>({});

    const sendToEndGame = async (args: any) => {
        setTimeout(async () => {
            // enregistrer les données dans la db
            if (args.idUser === args.host) {
                createGame({
                    id: args.id_game,
                    idJoin: args.code,
                    idHost: args.host,
                    dateTime: new Date().toISOString(),
                    name: args.name,
                    type: args.nbPlayers === 1 ? "SinglePlayer" : "Multiplayer",
                });
            }

            createScore({
                idUser: args.idUser,
                idGame: args.id_game,
                score: args.score,
                words: args.words.join(","),
            });

            createLog({
                idUser: args.idUser,
                log: 'Fin de partie',
            });

            if (args.charts) {
                const updatedCharts: { [key: string]: TestData } = {};

                Object.keys(args.charts).forEach((key: string) => {
                    const entry = args.charts[key];
                    const updatedChart = updateGraphWordChartEndPage(entry);
                    updatedCharts[key] = updatedChart;
                });

                setAllCharts(prevCharts => ({
                    ...prevCharts,
                    ...updatedCharts
                }));
            }
            audioEndGame.play();
            handleNextPage("ending");
        }, 2000);
    };

    const [dataGraph, setDataGraph] = useState<TestData>({ WordsChart: {} });

    // Fonction pour mettre à jour WordsChart avec de nouvelles entrées
    const updateGraphWordChart = (newEntries: [string, string, number][]) => {
        const updatedWordsChart: TestData['WordsChart'] = {};

        newEntries.forEach((entry, index) => {
            const newKey = `key${index + 1}`;
            updatedWordsChart[newKey] = [entry[0], entry[1], entry[2].toString()];
        });

        setDataGraph({ WordsChart: updatedWordsChart });
    };

    // Fonction asynchrone pour traiter les nouvelles données et mettre à jour le graphe
    const updateGraphData = async (args: any) => {
        audioNewScoreAlly.play();
        setAlertBox((prevState) => ({
            ...prevState,
            severity: "info",
            open: true,
            message: args.msg,
        }));
        if (!context?.user) {
            console.error("User context is not available");
            return;
        }
        createLog({
            idUser: context.user.id,
            log: 'A entré un mot',
        });
        updatePlayerScoreByName(args.id, args.score);
        setListWords(prevListWords => [...prevListWords, args.word]);
        updateGraphWordChart(args.chart);
    };

    useEffect(() => {
        setcoupsRestants(coupsRestants - 1);
    }, [listWords]);

    useEffect(() => {
        if (currentPage === "ending") {
            setIsDataLoading(false);
        }
    }, [currentPage]);

    useEffect(() => {
        if (coupsRestants <= 0) {
            const timer = setTimeout(() => {
                setIsDataLoading(true);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [coupsRestants]);

    useEffect(() => {
        if (isTimerFinished) {
            const timer = setTimeout(() => {
                setIsDataLoading(true);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [isTimerFinished]);

    /* Notification sonore*/
    const [audioMessage] = useState(new Audio("/sound/message_notification.mp3"));
    const [audioNewScoreEnemy] = useState(new Audio("/sound/new_score_enemy.mp3"));
    const [audioNewScoreAlly] = useState(new Audio("/sound/new_score_ally.mp3"));
    const [audioAddWordWarning] = useState(new Audio("/sound/add_word_warning.mp3"));
    const [audioAddWordError] = useState(new Audio("/sound/add_word_error.mp3"));
    const [audioEndGame] = useState(new Audio("/sound/end_game.mp3"));
    const [audioCountdown] = useState(new Audio("/sound/countdown.mp3"));
    const [isSoundEnabled, setIsSoundEnabled] = useState(true);

    const toggleSound = () => {
        setIsSoundEnabled(!isSoundEnabled);
        const newVolume = isSoundEnabled ? 0 : 1;
        audioMessage.volume = newVolume;
        audioNewScoreEnemy.volume = newVolume;
        audioNewScoreAlly.volume = newVolume;
        audioAddWordWarning.volume = newVolume;
        audioAddWordError.volume = newVolume;
        audioEndGame.volume = newVolume;
        audioCountdown.volume = newVolume;
    };

    return (
        <>
            {isDataLoading ? (
                playersInGame.length > 1 ? (
                    <>
                        <CenteredTitle text={"En attente des autres joueurs ..."}></CenteredTitle>
                        <Loader />
                    </>
                ) : (
                    <Loader />
                )
            ) : (
                <>
                    {/* ================== ALERTBOX ==================== */}
                    <AlertBox severity={alertBox.severity} open={alertBox.open} message={alertBox.message} handleClose={handleAlert}></AlertBox>
                    {/* ================================================ */}
                    {currentPage === "choosing" && <div>
                        <AlertInvitationBox open={alertInvitationBox.open} message={alertInvitationBox.message} handleAccept={handleAcceptInvitation} handleRefuse={handleRefuseInvitation} handleClose={handleAlert} ></AlertInvitationBox>
                        <ChoosingGameTemplate handleNextPage={handleNextPage} />
                        </div>}
                    {currentPage === "creating" && <div>
                        <AlertInvitationBox open={alertInvitationBox.open} message={alertInvitationBox.message} handleAccept={handleAcceptInvitation} handleRefuse={handleRefuseInvitation} handleClose={handleAlert} ></AlertInvitationBox>
                        <SetUpGameTemplate handlePreviousPage={handlePreviousPage} infoGame={infoGame} handleTypeGame={handleTypeGame} handleInputChange={handleInputChangeCreate} handleSubmit={handleSubmitCreateGame} /></div>}
                    {currentPage === "joining" && <div>
                        <AlertInvitationBox open={alertInvitationBox.open} message={alertInvitationBox.message} handleAccept={handleAcceptInvitation} handleRefuse={handleRefuseInvitation} handleClose={handleAlert} ></AlertInvitationBox>
                        <JoinRoomTemplate handlePreviousPage={handlePreviousPage} handleInputChange={handleInputChangeJoin} handleSubmit={handleSubmitJoinCode} /></div>}
                    {(currentPage === "waiting" && players !== undefined) && <div>
                        <WaitingRoomTemplate
                            handleNextPage={handleNextPage}
                            handlePreviousPage={handleLeaveGame} 
                            isHost={isHost} players={players} 
                            handleStartGame={handleStartGame} 
                            infoGame={infoGame} 
                            hasNewMessage={hasNewMessage}
                            isSoundEnabled={isSoundEnabled}
                            toggleSound={toggleSound}
                            toggleChatVisibility={toggleChatVisibility}
                            isChatVisible={isChatVisible}
                            messages={messages}
                            onInputChangeChat={handleInputChangeMessage}
                            SumbitMessageChat={handleSubmitMessage} 
                            dataFriends={dataFriends}
                            inviteFriend={inviteFriend}
                        />
                    </div>}
                    {(currentPage === "gaming" && playersInGame !== undefined) && <div>
                        <GameTemplate
                            graph={dataGraph}
                            coupsRestants={coupsRestants}
                            listwords={listWords}
                            infoGame={infoGame}
                            players={playersInGame}
                            updateGraphWithNewWord={updateGraphWithNewWord}
                            toggleSound={toggleSound}
                            toggleChatVisibility={toggleChatVisibility}
                            isModalWordListVisible={isModalWordListVisible}
                            toggleWordsListVisibility={toggleWordsListVisibility}
                            isChatVisible={isChatVisible} messages={messages}
                            onInputChangeChat={handleInputChangeMessage}
                            SumbitMessageChat={handleSubmitMessage}
                            hasNewMessage={hasNewMessage}
                            isSoundEnabled={isSoundEnabled}
                            isBtnDisabled={isBtnDisabled}
                            setIsTimerFinished={setIsTimerFinished}
                        />
                    </div>}
                    {currentPage === "ending" && <div><EndGameTemplate playersInGame={playersInGame} handleFinishPage={handleFinishPage} handlePlayAgain={handlePlayAgain} graphs={allCharts} /></div>}
                    {currentPage && !["choosing", "creating", "joining", "waiting", "gaming", "ending"].includes(currentPage) && <div>Invalid State</div>}
                </>
            )}
        </>
    );
}

