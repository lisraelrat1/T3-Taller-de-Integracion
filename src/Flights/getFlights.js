import { useEffect, useRef, useState } from "react";
const io = require("socket.io-client");

const FLIGHTS= "FLIGHTS";

const getFlights = () => {
    const [flights, setFlights] = useState([]);
    const socketRef = useRef();

    useEffect(() => {
      socketRef.current.on(FLIGHTS, (vuelos) => {
        setFlights(vuelos);
      });
  
      return () => {
        socketRef.current.disconnect();
      };
    }, []);

    const requestFlights = (messageBody) => {
      socketRef.current.emit(FLIGHTS);
    };
    
  
    return {flights, requestFlights};
};

export default getFlights;