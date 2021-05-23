import React from "react";

import "./Map.css";
import GetFlights from "../Flights/getFlights";
import useMap from "./useMap"

// import Airplane from '@material-ui/icons/AirplanemodeActive';
import {MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import "leaflet/dist/leaflet.css"

import markerIconPng from "leaflet/dist/images/marker-icon.png"
import dotIcon from '../dot.svg'
import Airplane from '../plane.svg'
import {Icon} from 'leaflet'

import L from 'leaflet';


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

  let airplaneIcon = L.icon({
    iconUrl: Airplane,
    iconRetinaUrl: Airplane,
    iconAnchor: [5, 55],
    popupAnchor: [10, -44],
    iconSize: [25, 55],
  })

  // const filtered = []
  // if (flights) {
  //   flights.map(flight =>
  //     filtered.push([positions.filter(position => flight.code === position.code)])
  // )}
  // console.log(coords)

  return (
    <div className="map-container">
      {requestFlights}
      <MapContainer center={[-22.05, -60.99]} zoom={3} scrollWheelZoom={false} style={{height:480}}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* <Polyline pathOptions={color[color.length * Math.random() | 0]} positions={coords} /> */}

        {polyline.map(element =>
        <div>
          <Polyline pathOptions={{ color: 'black' }} positions={element} />
          
          <Marker position={element[0]} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})} />
          <Marker position={element[1]} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})} />
        </div>
        )}

        {positions.map(position =>
        <div>
          {/* {console.log(position)}  */}
          {/* <Marker icon={airplaneIcon} key={position.toString()} position={[position.position[0],position.position[1]]}>
              {position.code && <Popup>
                  <span>{position.code}</span>
              </Popup>}
          </Marker> */}
          <Marker position={[position.position[0],position.position[1]]} icon={new Icon({iconUrl: dotIcon, iconSize: [15, 15]})}>
              {position.code && <Popup>
                  <span>{position.code}</span>
              </Popup>}
          </Marker>
        </div>
        )}
      </MapContainer>
      
    </div>
  );
};

export default Mapa;