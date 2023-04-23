import React from 'react';
import {
    Marker,
    InfoWindow
} from 'react-google-maps';

const CustomMarker = ({ openInfoWindow, lastMarker, marker, subindex, index, lineColors }) => {

    const droneIcon = { url: 'src/assets/drone.svg' };
    const circleIcon = (index) => {
        return { path: google.maps.SymbolPath.CIRCLE, strokeWeight: 2, fillOpacity: 1, strokeColor: lineColors[index % 10], fillColor: lineColors[index % 10] };
    }

    const formatTime = (ts) => {
        const date = new Date(ts);
        return date.toLocaleString();
    }

    return (<Marker
        position={marker}
        icon={lastMarker ? droneIcon : circleIcon(index)}
        onClick={() => openInfoWindow(index, subindex)}
    >
        {marker.isInfoOpen || lastMarker ? <InfoWindow>
            <div style={{
                'color': 'black'
            }}>
                <div> {marker.lat},</div>
                <div> {marker.lng} at</div>
                <div>{formatTime(marker.timestamp)}</div>
            </div>
        </InfoWindow> : null}
    </Marker>);
}

export default React.memo(CustomMarker, (prev, current) => {
    return prev.lastMarker == current.lastMarker && prev.isInfoOpen == current.isInfoOpen
})
