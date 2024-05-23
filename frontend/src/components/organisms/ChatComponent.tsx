import React, { Component, ChangeEvent, KeyboardEvent } from 'react';
import '../../assets/css/Chat.css';

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

class ChatComponent extends Component<{}, State> {
  state: State = {
    ws: null,
    connected: false,
    messages: [{ nickname: 'Inky', message: 'Le jeu est facile !' }, { nickname: 'Rykyo', message: 'C\'est super dur !' }],
    text: ""
  };

  componentDidMount() {
    this.joinChat();
  }

  joinChat = () => {
    const ws = new WebSocket("ws://localhost:8765/chat");
    ws.addEventListener("open", this.onChatJoined);
    ws.addEventListener("close", this.onChatClosed);
    ws.addEventListener("message", this.onChatReceived);
    ws.addEventListener("error", this.onChatError);

    const data = {
      "action": "send_data",
      "args": {
        "id": "", //TODO
        "nickname": "" //TODO
      }
    };
    ws.send(JSON.stringify(data));

    this.setState({ ws });
  };

  closeChat = () => {
    const { ws } = this.state;
    if (ws !== null) {
      const data = { "action": "leave_chat" };
      ws.send(JSON.stringify(data));
      ws.close();
      this.setState({ ws: null, connected: false, messages: [] });
    }
  };

  sendMessage = () => {
    const { ws, connected, text } = this.state;
    if (ws !== null && connected) {
      const data = { "action": "send_message", "args": { "message": text } };
      ws.send(JSON.stringify(data));
      this.setState({ text: "" });
    }
  };

  onMessageKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      this.sendMessage();
    }
  };

  onChatJoined = () => {
    const { ws } = this.state;
    if (ws !== null) {
      const data = { "action": "join_chat", "args": { "nickname": "" } } //TODO;
      ws.send(JSON.stringify(data));
      this.setState({ connected: true });
    }
  };

  onChatClosed = () => {
    this.setState({ connected: false, messages: [] });
  };

  onChatReceived = (event: MessageEvent) => {
    let data: any = null;
    try {
      data = JSON.parse(event.data);
    } catch(e) {
      console.log(event.data);
      return;
    }

    if (data["action"] === "join_chat") {
      if (data["args"]["return"] === "error") {
        alert(data["args"]["msg"]);
        this.closeChat();
      } else if (data["args"]["return"] === "success") {
        console.log("Chat joined successfully");
      }
    } else if (data["action"] === "new_message") {
      const { messages } = this.state;
      const newMessage: Message = { nickname: data["args"]["from"], message: data['args']['message'] };
      this.setState({ messages: [...messages, newMessage] });
    }
  };

  onChatError = (event: Event) => {
    console.log(event);
  };

  render() {
    const { messages, text } = this.state;

    return (
      <div>
        <div id="chatbox">
          {messages.map((message, index) => (
            <div key={index} className="chat-msg">
              <strong className="chat-nickname">{message.nickname}</strong> : {message.message}
            </div>
          ))}
        </div>
        <input type="text" value={text} onChange={(e: ChangeEvent<HTMLInputElement>) => this.setState({ text: e.target.value })} onKeyUp={this.onMessageKeyUp} />
        <button onClick={this.sendMessage}>Send</button>
      </div>
    );
  }
}

export default ChatComponent;
