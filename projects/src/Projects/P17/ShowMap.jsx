import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function UpdateMapCenter({ lon, lat }) {
    const map = useMap();

    useEffect(() => {
        map.setView([lat, lon], 10);
    }, [lon, lat, map]);

    return null;
}

function ShowMap({ lon, lat }) {
    return (
        <MapContainer center={[lat, lon]} zoom={10} style={{ height: "50vh" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <UpdateMapCenter lon={lon} lat={lat} />
        </MapContainer>
    );
}

export default ShowMap;
