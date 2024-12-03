import { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
const containerStyle = {
    width: '100vw', // Full width of the viewport
    height: '100vh', // Full height of the viewport
};

const defaultCenter = {
    lat: -3.745,
    lng: -38.523,
};

const Map = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyC07ypwKM1RfudPJzISDsH5qukPqZwVTkw', // Your API Key
    });

    const [map, setMap] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);

    const onLoad = useCallback((mapInstance) => {
        setMap(mapInstance);
    }, []);

    const onUnmount = useCallback(() => {
        setMap(null);
    }, []);

    // Fetch user's current location
    const handleMyLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const userLocation = { lat: latitude, lng: longitude };
                    setCurrentLocation(userLocation); // Update current location state
                    map.panTo(userLocation); // Center the map on the user's location
                },
                (error) => {
                    console.error("Error fetching user's location:", error);
                }
            );
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    };

    return isLoaded ? (
        <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
            {/* Map Container */}
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={defaultCenter}
                zoom={10}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                {/* Marker for the user's location */}
                {currentLocation && (
                    <Marker
                        position={currentLocation}
                        title="You are here"
                        icon={{
                            url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                        }}
                    />
                )}
            </GoogleMap>

            {/* My Location Button */}
            <button
                onClick={handleMyLocation}
                style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    zIndex: 1000,
                }}
            >
                My Location
            </button>
        </div>
    ) : (
        <div>Loading...</div> // Fallback content while the map loads
    );
};

export default Map;
