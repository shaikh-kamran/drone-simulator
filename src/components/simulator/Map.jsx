import React from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Polyline
} from 'react-google-maps';
import CustomMarker from './CustomMarker';

const Map = withScriptjs(
    withGoogleMap((props) => {
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
                        {place.map((marker, subindex) => {
                            return (<div key={index + subindex}>
                                <CustomMarker
                                    lastMarker={subindex === place.length - 1}
                                    openInfoWindow={props.openInfoWindow}
                                    lineColors={props.lineColors}
                                    isInfoOpen={marker.isInfoOpen}
                                    marker={marker}
                                    subindex={subindex}
                                    index={index}
                                />
                            </div>)
                        })}
                    </div>)
                })}
            </GoogleMap >
        )
    })
);

export default Map
