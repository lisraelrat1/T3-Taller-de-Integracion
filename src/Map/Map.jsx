import React from "react";

import "./Map.css";
// import GetFlights from "../Flights/getFlights";
import useMap from "./useMap"

import Airplane from '@material-ui/icons/AirplanemodeActive';
import ReactDOM from "react-dom";
import {MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css"


const Mapa = (props) => {
  // const {flights, requestFlights} = GetFlights(); 
  const {positions} = useMap()

  return (
    
    <div className="map-container">
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} style={{height:480}}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
      
    </div>
  );
};

export default Mapa;