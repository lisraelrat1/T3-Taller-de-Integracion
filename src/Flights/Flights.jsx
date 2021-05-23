import React from "react";

import "./Flights.css";
import GetFlights from "./getFlights";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";


const Flights = (props) => {
  const {flights, requestFlights} = GetFlights(); 

  const bringFlights = () => {
    requestFlights();
    console.log(flights)
  };

  return (
    <div className="flights-container">
      <Button onClick={bringFlights} style={{height: '25%', margin: 'auto 5px ', backgroundColor: ' rgb(0, 132, 255)'}}>
        Traer Vuelos
      </Button>
        {flights.map(function(item,index){
          return (
       <Card
        style={{
          width: 300,
          height: 180,
          margin: 10,
          backgroundColor: "#eeeeee",
          maxHeight: 200, 
          overflow: 'auto'
        }}
      >
        <CardContent>
          <Typography variant="h5" component="h2">
            Vuelo {item.code}
          </Typography>
          <Typography
            color="textSecondary"
          >
            {item.airline}
          </Typography>

          <Typography>
            <p>{item.plane} - N° of seats: {item.seats}</p>
            <p> Origin: {item.origin[0]},{item.origin[1]}</p>
            <p> Destination: {item.destination[0]},{item.destination[1]}</p>
            <p>Passagers: </p>
            
            {item.passengers.map(function(item1,number){
              return (
                  <p id={number} className='info'> 
                  {item1.name} - {item1.age} 
                  </p>
        
                 );
              })}
          </Typography>
        </CardContent>
      </Card>
        )})}
    </div>
  );
};

export default Flights;

