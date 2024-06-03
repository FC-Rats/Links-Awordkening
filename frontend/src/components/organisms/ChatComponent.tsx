import React, { useState, ChangeEventHandler, KeyboardEventHandler } from 'react';
import "../../assets/css/Chat.css"
import { SubmitButton } from '../molecules/SubmitButton';
import { TextareaAutosize } from '@mui/material';
import { Message } from '../types/Message';


interface ChatProps {
    messages : Message[];
    onSubmit: () => void;
    onInputChange: (name: string, value: string) => void;
}

const ChatComponent: React.FC<ChatProps> = ({ messages, onInputChange , onSubmit}) => {
  const [textMessage, setTextMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
    setTextMessage("");
  };

  const handleInputChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    const { name, value } = event.target;
    onInputChange(name, value);
    setTextMessage(value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        onSubmit();
        setTextMessage("");
    }
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
      <form id="messageForm" method='post' onSubmit={handleSubmit}>
        <div className='formchat'>
          <TextareaAutosize className='contour-input-form'
            placeholder="Entrer votre message"
            minRows={3}
            required
            value={textMessage} 
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />         
          <SubmitButton text={'Envoyer'}/>
        </div>
      </form>
    </>
  );
};

export default ChatComponent;

