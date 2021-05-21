import React from "react";

import "./index.css";
import ChatRoom from "./ChatRoom/ChatRoom";
import Flights from "./Flights/Flights"
import Map from "./Map/Map"

function App() {
  return (
    <div>
    <ChatRoom />
    <Flights />
    <Map />
    </div>
  );
}

export default App;