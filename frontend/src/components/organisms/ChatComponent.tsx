import React, { useState, useContext, useRef } from 'react';
import { AppContext } from '../hooks/AppContext';
import "../../assets/css/Chat.css"
import { SubmitButton } from '../molecules/SubmitButton';
import { TextareaAutosize } from '@mui/material';

interface Message {
  nickname: string;
  message: string;
}

interface State {
  ws: WebSocket | null;
  connected: boolean;
  messages: Message[];
  text: string;
}

interface ChatProps {}

const ChatComponent: React.FC<ChatProps> = () => {
  const user = useContext(AppContext);
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { nickname: 'Inky', message: 'Le jeu est facile !eeeeeeeeeeeeeeeeeeeeeee eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee eeeeee eeeeeeeeee eeeeeee' },
    { nickname: 'Rykyo', message: 'C\'est super dur !' }
  ]);
  const [text, setText] = useState("");
  const ws = useRef<WebSocket | null>(null);
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleInputChange =  (name: string, value: string) => {
  };

  return (
    <>
      <div id="chatbox" className="chatbox">
        {messages.map((message, index) => (
          <div key={index} className="chat-msg">
            <strong className="chat-nickname">{message.nickname}</strong> : {message.message}
          </div>
        ))}
      </div>
      <form method='post' onSubmit={handleSubmit}>
        <div className='formchat'>
        <TextareaAutosize className='contour-input-form'
          placeholder="Entrer votre message"
          minRows={3}
          required
        />
            {/*type="text"
            value={text}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
            //onKeyUp={onMessageKeyUp}  */}
          
          <SubmitButton text={'Envoyer'}/>
        </div>
      </form>
    </>
  );
};

export default ChatComponent;

