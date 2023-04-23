import React from 'react';
import styles from './control_panel.module.css';

const ControlPanel = (props) => {

    let filereader;
    const uploadJsonMarkers = (e) => {
        const file = e.target.files[0];
        filereader = new FileReader();
        filereader.onloadend = handleFileRead;
        filereader.readAsText(file);
    }

    const handleFileRead = (e) => {
        const data = filereader.result;
        const content = JSON.parse(data);
        props.reloadSimulatorData(content);
    }

    return (
        <div>
            <button className={styles.simulator}
                onClick={() => props.setDroneState(Math.abs(props.droneState - 1))}>
                {props.droneState === 0 ? "Start" : "Pause"} Simulation
            </button>
            <div className={styles.file_input}>
                <input
                    type="file"
                    accept="application/JSON"
                    onChange={uploadJsonMarkers}
                    name="file-input"
                    id="file-input"
                    className={styles.file_input__input}
                />
                <label className={styles.file_input__label} htmlFor="file-input">
                    <span>Add Drone ( json file )</span>
                </label>
            </div>
        </div>
    )

}

export default React.memo(ControlPanel, (prev, next) => {
    return prev.droneState == next.droneState
})