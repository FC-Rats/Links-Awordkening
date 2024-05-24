import { useContext, useEffect, useRef, useState } from "react";
import { GameTemplate } from "../templates/GameTemplate";
import { Loader } from "../atoms/Loader";
import { Message } from "../types/Message";
import { AppContext } from "../hooks/AppContext";
import { AlertBox } from "../molecules/AlertBox";

export const GamePage = () => {
    /* SNACK BAR - ALERT HANDLING */
    const [alertBox, setAlertBox] = useState({
        severity: "success",
        open: false,
        message: '',
    });

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

    /* GAME STATE */
    const [hasGameStarted, setHasGameStarted] = useState(false);

    /* LOADER */
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);

    /* WEBSOCKETS */
    const user = useContext(AppContext);
    const wsc = useRef<WebSocket | null>(null);
    const wsg = useRef<WebSocket | null>(null);
    const [connected, setConnected] = useState(false);

    /* Tchat */
    const [messages, setMessages] = useState<Message[]>([
      { nickname: 'Inky', message: 'Le jeu est facile ! eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee eeeeee eeeeeeeeee eeeeeee' },
      { nickname: 'Rykyo', message: 'C\'est super dur !' }
    ]);
    const [textMessage, setTextMessage] = useState("");
    const [isChatVisible, setIsChatVisible] = useState(false);

    const toggleChatVisibility = () => {
        setIsChatVisible(!isChatVisible);
    };

    const handleSubmitMessage = async () => {
        console.log(textMessage);
    };

    const handleInputChangeMessage = (name: string, value: string) => {
        setTextMessage(value);
    };

    /* ADD WORD */
    const [newWord, setNewWord] = useState("");

    const updateGraphWithNewWord = (word: string) => {
        setNewWord(word);
    };

    /*     useEffect(() => {
            setIsDataLoading(true);
            fetch("http://localhost/Links-Awordkening/Includes/test.php")
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    setData(data);
                    setIsDataLoading(false);
                })
                .catch((error) => {
                    setError(error);
                    setIsDataLoading(false);
                });
        }, []);
     */
    /* 
        useEffect(() => {
            async function fetchData() {
                setIsDataLoading(true)
                try {
                    const response = await fetch(`http://localhost/Links-Awordkening/api/Log/test.php`)
                    const data = await response.json()
                    setData(data)
                    console.log(data)
                } catch (err) {
                    console.log('===== error =====', err)
                    setError(true)
                } finally {
                    setIsDataLoading(false)
                }
            }
            fetchData()
        }, []) */
        /* 
    useEffect(() => {
        joinChat();
        
        return () => {
        closeChat();
        };
    }, []);

    const joinChat = () => {
        ws.current = new WebSocket("ws://localhost:8765/chat");
        ws.current.addEventListener("open", onChatJoined);  // on se connecte
        ws.current.addEventListener("close", onChatClosed); // on se déco
        ws.current.addEventListener("message", onChatReceived); // on send data
        ws.current.addEventListener("error", onChatError); // erreurs

        const data = {
        action: "send_data",
        args: {
            id: user?.user?.id,
            nickname: user?.user?.name
        }
        };
        ws.current.send(JSON.stringify(data));
    };

    const closeChat = () => {
        if (ws.current) {
        const data = { action: "leave_chat" };
        ws.current.send(JSON.stringify(data));
        ws.current.close();
        setConnected(false);
        setMessages([]);
        }
    };

    const sendMessage = () => {
        if (ws.current && connected) {
        const data = { action: "send_message", args: { message: text } };
        ws.current.send(JSON.stringify(data));
        setText("");
        }
    };

    const onMessageKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
        }
    };

    const onChatJoined = () => {
        if (ws.current) {
        const data = { action: "join_chat", args: { nickname: "" } }; //TODO
        ws.current.send(JSON.stringify(data));
        setConnected(true);
        }
    };

    const onChatClosed = () => {
        setConnected(false);
        setMessages([]);
    };

    const onChatReceived = (event: MessageEvent) => {
        let data: any;
        try {
        data = JSON.parse(event.data);
        } catch (e) {
        console.log(event.data);
        return;
        }

        if (data.action === "join_chat") {
        if (data.args.return === "error") {
            alert(data.args.msg);
            closeChat();
        } else if (data.args.return === "success") {
            console.log("Chat joined successfully");
        }
        } else if (data.action === "new_message") {
        const newMessage: Message = { nickname: data.args.from, message: data.args.message };
        setMessages(prevMessages => [...prevMessages, newMessage]);
        }
    };

    const onChatError = (event: Event) => {
        console.log(event);
    }; */


    if (error) {
        return <span>Oups il y a eu un problème</span>
    }
    
    return (
        <>
            {isDataLoading ? (
                <Loader />
            ) : (
                <>
                <AlertBox severity={alertBox.severity} open={alertBox.open} message={alertBox.message} handleClose={handleAlert}></AlertBox>
                <GameTemplate 
                newWord={newWord} 
                updateGraphWithNewWord={updateGraphWithNewWord} 
                toggleChatVisibility={toggleChatVisibility} 
                isChatVisible={isChatVisible} messages={messages} 
                onInputChangeChat={handleInputChangeMessage} 
                SumbitMessageChat={handleSubmitMessage}                
                />
                </>
            )}
        </>

    );
};
