import { useEffect, useRef, useState } from "react";
const io = require("socket.io-client");

const POSITION= "POSITION";

const useMap = () => {
    const [positions, setPositions] = useState([]);
    const socketRef = useRef();
    
    useEffect(() => {
      socketRef.current = io("wss://tarea-3-websocket.2021-1.tallerdeintegracion.cl", {
        path: "/flights"
      });
  
      socketRef.current.on(POSITION, (coords) => {
        const incomingPosition = {
          ...coords,
        }
        setPositions((positions) => [...positions, incomingPosition]);
      });
  
      return () => {
        socketRef.current.disconnect();
      };
    }, []);

    return {positions};
};

export default useMap;