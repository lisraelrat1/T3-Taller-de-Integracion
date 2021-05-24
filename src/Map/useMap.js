import { useEffect, useRef, useState } from "react";
const io = require("socket.io-client");

const POSITION= "POSITION";

const useMap = () => {
    const [positions, setPositions] = useState([]);
    const socketRef = useRef();
    
    useEffect(() => {
      socketRef.current = io("wss://tarea-3-websocket.2021-1.tallerdeintegracion.cl", {
        path: "/flights",
        transports: ['websocket']
      });
  
      socketRef.current.on(POSITION, (coords) => {
        const incomingPosition = {
          ...coords,
        }
        // setPositions((positions) => [...positions, incomingPosition]);
        setPositions((positions) =>  [...positions, [[incomingPosition.position[0],incomingPosition.position[1]], [incomingPosition.position[0] + 0.00000001,incomingPosition.position[1] + 0.000000001]]]);
      });

      // socketRef.current.on(POSITION, (coords) => {
        
      //   setPositions((positions) =>  [...positions, [[incomingPosition.position[0],incomingPosition.position[1]], [incomingPosition.position[0] + 0.00000001,incomingPosition.position[1] + 0.000000001]]]);
      // });

  
      // return () => {
      //   socketRef.current.disconnect();
      // };
    }, []);

    return {positions};
};

export default useMap;