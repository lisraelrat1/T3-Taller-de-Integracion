import React from "react";

import "./index.css";

import {SocketContext, socket} from './context/socket';

import ChatRoom from "./ChatRoom/ChatRoom";
import Flights from "./Flights/Flights"
import Map from "./Map/Map"

function App() {
  return (
    <SocketContext.Provider value={socket}>
      <ChatRoom />
      <Flights />
      <Map />
    </SocketContext.Provider>
  );
}

export default App;