export const googleMapsApiKey = import.meta.env.VITE_GOOGLE_API_KEY;
export const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=geometry,drawing,places`;

export const lineColors = ['blue', 'yellow', 'green', 'red', 'purple', 'blue', 'yellow', 'green', 'red', 'purple'];
export const defaultZoom = 17;
export const droneSimulationSpeed = 1000;
export const defaultDataFile = 'data.json';