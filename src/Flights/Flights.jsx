import React from "react";

import "./Flights.css";
import getFlights from "./getFlights";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";



const Flights = (props) => {
  const {flights, requestFlights} = getFlights(); 
  


  return (
    <div></div>
  );
};

export default Flights;