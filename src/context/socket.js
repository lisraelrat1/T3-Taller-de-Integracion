import React from "react";
import socketio from "socket.io-client";

export const socket = socketio.connect("wss://tarea-3-websocket.2021-1.tallerdeintegracion.cl", {
    path: "/flights"
  });
export const SocketContext = React.createContext();