import { useContext, useEffect, useRef, useState } from "react";
import { JoinRoomTemplate } from "../templates/JoinRoomTemplate";
import { AppContext, useUserContext } from "../hooks/AppContext";
import { join } from "path";
import { AlertBox } from "../molecules/AlertBox";

export const JoinRoomPage = () => {
  /* SNACK BAR - ALERT HANDLING */
  const [alertBox, setAlertBox] = useState({
    severity: "success",
    open: false,
    message: "",
  });

  /**
   * @description Permet de fermer automatique l'Alertbox au bout de 4 secondes
   */
  const handleAlert = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertBox((prevState) => ({
      ...prevState,
      open: false,
    }));
  };

  const [formData, setFormData] = useState({
    codeRoom: "",
  });

  const handleInputChange = (name: string, value: any) => {
    setFormData({ ...formData, [name]: value });
  };

  const context = useContext(AppContext);
  const { initializeWSG, closeWSG, saveWSG } = useUserContext();
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const connectToGame = async () => {
      await joinGame();
      console.log("WebSocket in context:", context?.wsgCurrent.current);
    };
  
    connectToGame();
  
    return () => {
      if (context?.wsgCurrent) {
        closeWSG();
      }
    };
  }, []);

  const joinGame = async () => {
    const ws = await initializeWSG("ws://localhost:8765/game");
    if (ws) {
        ws.addEventListener("open", onSendData);
        ws.addEventListener("close", onGameClosed);
        ws.addEventListener("message", onChatReceived);
        ws.addEventListener("error", onGameError);
    }
    saveWSG(ws);
  };

  function onSendData(ev: Event) {
    const data = {
      action: "send_data",
      args: {
        id: context?.user?.id,
        nickname: context?.user?.name,
      },
    };
    if (context?.wsgCurrent && context?.wsgCurrent?.current?.readyState === WebSocket.OPEN) {
      context?.wsgCurrent?.current?.send(JSON.stringify(data));
    } else {
      console.error("WebSocket is not open. Unable to send data.");
    }
  }

  function onGameClosed(ev: Event) {
    console.log("Game closed", ev);
  }

  function onChatReceived(ev: MessageEvent<any>) {
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

  function onGameError(ev: Event) {
    console.error("Game error", ev);
  }

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    console.log(formData);
    const data = {
      action: "join_game",
      args: {
        game_code: formData.codeRoom,
      },
    };
    context?.wsgCurrent?.current?.send(JSON.stringify(data));
  };

  return (
    <>
      <AlertBox
        severity={alertBox.severity}
        open={alertBox.open}
        message={alertBox.message}
        handleClose={handleAlert}
      ></AlertBox>
      <JoinRoomTemplate
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
};
