import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { GameTemplate } from "../templates/GameTemplate";
import { Loader } from "../atoms/Loader";
import { Message } from "../types/Message";
import { AppContext } from "../hooks/AppContext";
import { AlertBox } from "../molecules/AlertBox";
import { SetUpGameTemplate, SetUpGameProps } from "../templates/SetUpGameTemplate";
import { ChoosingGameTemplate } from "../templates/ChoosingGameTemplate";
import { JoinRoomTemplate } from "../templates/JoinRoomTemplate";
import { WaitingRoomTemplate } from "../templates/WaitingRoomTemplate";
import { UserInfo } from "../types/UserInfo";

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
    const [isHost, setisHost] = useState(false);

    // =============================================================

    // ================== WEBSOCKETS & LISTENERS ===================
    const context = useContext(AppContext);
    const ws = useRef<WebSocket | null>(null);

    useEffect(() => {
        const connectToGame = async () => {
            await joinGame();
            console.log("WebSocket in context:", ws.current);

        };

        connectToGame();

        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, []);
    
      const joinGame = async () => {
        ws.current = new WebSocket("ws://localhost:8765/game");
        ws.current.addEventListener("open", onSendData);
        ws.current.addEventListener("close", onDataClosed);
        ws.current.addEventListener("message", onDataReceived);
        ws.current.addEventListener("error", onDataError);
      };

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
              console.log("e");
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
    const [codeRoom, setcodeRoom] = useState({
        codeRoom: "",
      });
    
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
    const [infoGame, setInfoGame] = useState({
        idJoin : '',
        nameGame: '', 
        coupsRestants: '10',
        nameHost: context?.user?.name, 
        type: 'multi',
        nombreJoueurs: '2',
    });

    const handleInputChangeCreate = (name: string, value: any) => {
        setInfoGame({ ...infoGame, [name]: value });
        if (name == "type" && value == 'solo'){
            setInfoGame({ ...infoGame, ['nombreJoueurs']: '1' });
        } else if (name == "type" && value == 'multi'){
            setInfoGame({ ...infoGame, ['nombreJoueurs']: '2' });
        }
    };

    const handleTypeGame= (name: string) => {
        setInfoGame(prevInfoGame => {
            if (name === 'solo'){
                return { ...prevInfoGame, type: 'solo', nombreJoueurs: '1' };
            } else if (name === 'multi'){
                return { ...prevInfoGame, type: 'multi', nombreJoueurs: '2' };
            }
            return prevInfoGame;
        });
    };

    const handleSubmitCreateGame = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(infoGame);
    };

    // ================ WAITING ROOM ==========================
    const [players, setplayers] = useState<UserInfo[]>();

    const handleStartGame = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(infoGame);
    };

    return (
        <>
            {/* ================== ALERTBOX ==================== */}
            <AlertBox severity={alertBox.severity} open={alertBox.open} message={alertBox.message} handleClose={handleAlert}></AlertBox>
            {/* ================================================ */}
            {currentPage === "choosing" && <div><ChoosingGameTemplate setStatePage={setCurrentPage} /></div>}
            {currentPage === "creating" && <div><SetUpGameTemplate infoGame={infoGame} handleTypeGame={handleTypeGame} handleInputChange={handleInputChangeCreate} handleSubmit={handleSubmitCreateGame} /></div>}
            {currentPage === "joining" && <div><JoinRoomTemplate handleInputChange={handleInputChangeJoin} handleSubmit={handleSubmitJoinCode} /></div>}
            {(currentPage === "waiting" && players != undefined) && <div><WaitingRoomTemplate isHost={isHost} players={players} handleStartGame={handleStartGame} infoGame={infoGame} /></div>}
            {currentPage === "gaming" && <div>Game in Progress...</div>}
            {currentPage === "ending" && <div>Game Over</div>}
            {!["choosing", "creating", "joining", "waiting", "gaming", "ending"].includes(currentPage) && <div>Invalid State</div>}
        </>

    );
}