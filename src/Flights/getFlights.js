import { useEffect, useRef, useState } from "react";
const io = require("socket.io-client");

const FLIGHTS= "FLIGHTS";

const GetFlights = () => {
    const [flights, setFlights] = useState([]);
    const socketRef = useRef();

    socketRef.current = io("wss://tarea-3-websocket.2021-1.tallerdeintegracion.cl", {
        path: "/flights"
      });

    useEffect(() => {

      socketRef.current.on(FLIGHTS, (vuelos) => {
        setFlights(vuelos);
      });
  
      return () => {
        socketRef.current.disconnect();
      };
    }, []);

    const requestFlights = () => {
      socketRef.current.emit(FLIGHTS);
    };
    
  
    return {flights, requestFlights};
};

export default GetFlights;