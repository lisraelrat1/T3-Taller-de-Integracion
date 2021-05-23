import React from "react";

import "./Map.css";
import GetFlights from "../Flights/getFlights";
import useMap from "./useMap"

import Airplane from '@material-ui/icons/AirplanemodeActive';
import ReactDOM from "react-dom";
import {MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import "leaflet/dist/leaflet.css"

import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'

import L from 'leaflet';


const Mapa = (props) => {
  const {flights, requestFlights} = GetFlights(); 
  const {positions} = useMap()

  // requestFlights()
  // console.log('hola', flights)

  const color = [{ fillColor: 'blue' }, { color: 'black' }, { color: 'lime' }, { color: 'purple' }, { color: 'red' }]

  const polyline = []
  flights.forEach(element => {
    polyline.push([element.origin, element.destination])
  })

  // console.log(polyline)
  const coords = []
  positions.forEach(position => {
    coords.push(position.position)
  })

  return (
    
    <div className="map-container">
      <MapContainer center={[0.61, -2.28]} zoom={2} scrollWheelZoom={false} style={{height:480}}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* <Polyline pathOptions={color[color.length * Math.random() | 0]} positions={coords} /> */}

        {polyline.map(element =>
        <div>
          <Polyline pathOptions={color[color.length * Math.random() | 0]} positions={element} />
          
          <Marker position={element[0]} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})} />
          <Marker position={element[1]} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})} />
        </div>
        )}
      </MapContainer>
      
    </div>
  );
};

export default Mapa;