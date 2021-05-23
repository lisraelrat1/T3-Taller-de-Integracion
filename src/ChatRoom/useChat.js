import { useEffect, useRef, useState} from "react";
const io = require("socket.io-client");

const NEW_CHAT_MESSAGE_EVENT = "CHAT";

const useChat = (username) => {
    const [messages, setMessages] = useState([]);
    const socketRef = useRef();

    useEffect(() => {
      socketRef.current = io("wss://tarea-3-websocket.2021-1.tallerdeintegracion.cl", {
        path: "/flights"
      });
  
      socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
        
        const incomingMessage = {
          ...message,
          ownedByCurrentUser: message.name === username //message.senderId === socketRef.current.id 
        };
        setMessages((messages) => [...messages, incomingMessage]);
      });
  
      return () => {
        socketRef.current.disconnect();
      };
    }, [username]);

    const sendMessage = (messageBody) => {
      socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
        'name': username,
        'message': messageBody,
      });
    };

    return { messages, sendMessage };
};

export default useChat;