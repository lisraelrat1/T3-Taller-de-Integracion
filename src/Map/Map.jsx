import React from "react";

import "./Map.css";
import getFlights from "../Flights/getFlights";
import useMap from "./useMap"


const Flights = (props) => {
  const {flights, requestFlights} = getFlights(); 
  const {positions} = useMap()

  return (
    <div></div>
  );
};

export default Flights;