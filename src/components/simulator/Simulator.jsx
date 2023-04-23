import { useState, useEffect } from 'react';
import Map from './Map';
import ControlPanel from '../control-panel/ControlPanel';
import { lineColors, googleMapURL, defaultZoom, defaultDataFile } from '../../constants';
import styles from './simulator.module.css';

var timer = [];

const Simulator = () => {

    const [simulationSpeed, setSimulationSpeed] = useState(1000);
    const [droneState, setDroneState] = useState(0);
    const [places, setPlaces] = useState([]);
    const [mapMarkers, setMapMarkers] = useState([]);
    const [defaultCenter, setDefaultCenter] = useState([]);

    useEffect(() => {
        loadDroneTrace();
    }, []);

    // Loads the first drone path on map from local file
    const loadDroneTrace = () => {
        fetch(defaultDataFile)
            .then((res) => res.json())
            .then((json) => {
                setDefaultCenter(json[0]);
                setMapMarkers([json]);
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        if (mapMarkers.length) {
            mapMarkers.forEach((mapMarker, index) => {
                if (places.length <= index) places[index] = [];
                moveDrone(index, places, droneState, mapMarkers);
            });
        }
    }, [mapMarkers, droneState]);

    // Moves the drone when new drone is added or start/paused
    const moveDrone = (index, places, state, markers) => {
        addMarker(index, places, markers);
        if (timer[index]) clearTimeout(timer[index])
        if (state && places[index].length < markers[index].length)
            timer[index] = setTimeout(() => { moveDrone(index, places, droneState, markers); }, simulationSpeed);
    }

    const addMarker = (index, places, markers) => {
        if (places[index].length < markers[index].length) {
            places[index].push(markers[index][places[index].length]);
            setPlaces([...places]);
        }
    }

    const changeDroneState = (state) => {
        setDroneState(state);
    }

    const addDroneData = (data) => {
        places.push([]);
        setPlaces([...places]);
        mapMarkers.push(data);
        setMapMarkers([...mapMarkers]);
    }

    //Opens up the info window when a unit is click on map
    const openInfoWindow = (i, j) => {
        places[i][j]['isInfoOpen'] = true;
        setPlaces([...places]);
    }

    return (
        <div className={styles.simulator} >
            <div className={styles.header} >
                Drone Simulator
            </div>
            {
                places.length > 0 && places[0].length > 2 ?
                    <Map
                        lineColors={lineColors}
                        googleMapURL={googleMapURL}
                        places={places}
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ width: '100%', height: "80vh" }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                        defaultCenter={defaultCenter}
                        defaultZoom={defaultZoom}
                        openInfoWindow={(i, j) => openInfoWindow(i, j)}
                    />
                    :
                    <div>
                        Click "Start Simulation" to see the magic!!!
                    </div>
            }
            <ControlPanel
                droneState={droneState}
                setDroneState={changeDroneState}
                reloadSimulatorData={addDroneData}
            />
        </div>
    )
}

export default Simulator
