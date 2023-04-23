import React from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    Polyline,
    InfoWindow
} from 'react-google-maps';

const Map = withScriptjs(
    withGoogleMap((props) => {

        const droneIcon = { url: 'src/assets/drone.svg' };
        const circleIcon = (index) => {
            return { path: google.maps.SymbolPath.CIRCLE, strokeWeight: 2, fillOpacity: 1, strokeColor: props.lineColors[index % 10], fillColor: props.lineColors[index % 10] };
        }

        const formatTime = (ts) => {
            const date = new Date(ts);
            return date.toLocaleString();
        }

        return (
            <GoogleMap
                defaultCenter={props.defaultCenter}
                defaultZoom={props.defaultZoom}
            >
                {
                    props.places.map((place, index) => {
                        return (
                            <Polyline
                                key={index}
                                path={place}
                                geodesic={true}
                                options={{
                                    strokeColor: props.lineColors[index % 10],
                                    strokeOpacity: 0.75,
                                    strokeWeight: 2
                                }}
                            />
                        )
                    })
                }

                {props.places.map((place, index) => {
                    return (<div key={index}>
                        {place.map((marker, j) => {
                            return (<div key={index + j}>
                                <Marker position={marker}
                                    icon={j === place.length - 1 ? droneIcon : circleIcon(index)}
                                    onClick={() => props.openInfoWindow(index, j)}
                                >
                                    {marker.isInfoOpen || j === place.length - 1 ?
                                        <InfoWindow>
                                            <div style={{ 'color': 'black' }}>
                                                <div> {marker.lat},</div>
                                                <div> {marker.lng} at</div>
                                                <div>{formatTime(marker.timestamp)}</div>
                                            </div>
                                        </InfoWindow>
                                        : null}
                                </Marker>
                            </div>)
                        })}
                    </div>)
                })}
            </GoogleMap >
        )
    })
);

export default Map