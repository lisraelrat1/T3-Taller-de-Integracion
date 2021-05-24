import React from "react";

import "./Map.css";
import GetFlights from "../Flights/getFlights";
import useMap from "./useMap"

// import Airplane from '@material-ui/icons/AirplanemodeActive';
import {MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import "leaflet/dist/leaflet.css"

import markerIconPng from "leaflet/dist/images/marker-icon.png"
import dotIcon from '../dot.svg'
import {Icon} from 'leaflet'


const Mapa = (props) => {
  const {flights, requestFlights} = GetFlights(); 
  const {positions} = useMap()

  requestFlights()

  const polyline = []
  flights.forEach(element => {
    polyline.push([element.origin, element.destination])
  })

  const coords = []
  positions.forEach(position => {
    coords.push(position.position)
  })

  return (
    <div className="map-container">
      {requestFlights}
      <MapContainer center={[-22.05, -60.99]} zoom={3} scrollWheelZoom={false} style={{height:450}}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {polyline.map(element =>
        <div>
          <Polyline pathOptions={{ color: 'black' }} positions={element} />
          
          <Marker position={element[0]} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})} />
          <Marker position={element[1]} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})} />
        </div>
        )}

        {/* {positions.map(position =>
          <Marker position={[position.position[0],position.position[1]]} icon={new Icon({iconUrl: dotIcon, iconSize: [25, 25]})}>
              {position.code && <Popup>
                  <span>{position.code}</span>
              </Popup>}
          </Marker>
        )} */}
      {positions.map(position =>
      <Polyline pathOptions={{ color: 'red' }} positions={position} />
      )}

      </MapContainer>
      
    </div>
  );
};

export default Mapa;