import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const LiveTracking = () => {
    // Reference to the map container
    const mapContainerRef = useRef(null);
    // Reference to the map instance
    const mapRef = useRef(null);
    // State to store the current position
    const [currentPosition, setCurrentPosition] = useState({lng: -38.523, lat: -3.745 });

    useEffect(() => {
        // Set the Mapbox access token
        mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
        // Initialize the map
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [currentPosition.lng, currentPosition.lat],
            zoom: 9
        });

        // Create a marker at the current position
        const marker = new mapboxgl.Marker()
            .setLngLat([currentPosition.lng, currentPosition.lat])
            .addTo(mapRef.current);

        // Get the initial position using the browser's geolocation API
        navigator.geolocation.getCurrentPosition((position) => {
            const {longitude, latitude } = position.coords;
            console.log('Initial position:', longitude, latitude);
            setCurrentPosition({ lng: longitude, lat: latitude });
            mapRef.current.setCenter([longitude, latitude]);
            marker.setLngLat([longitude, latitude]);
        });

        // Watch for position changes
        const watchId = navigator.geolocation.watchPosition((position) => {
            const {longitude, latitude } = position.coords;
            console.log('Updated position:',longitude, latitude);
            setCurrentPosition({ lng: longitude, lat: latitude });
            mapRef.current.setCenter([longitude, latitude]);
            marker.setLngLat([longitude, latitude]);
        });

        // Clear the watch when the component unmounts
        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    useEffect(() => {
        // Create a marker at the current position
        const marker = new mapboxgl.Marker()
            .setLngLat([currentPosition.lng, currentPosition.lat])
            .addTo(mapRef.current);

        // Function to update the position
        const updatePosition = () => {
            navigator.geolocation.getCurrentPosition((position) => {
                const {longitude, latitude } = position.coords;
                console.log('Position updated every 10 seconds:', latitude, longitude);
                setCurrentPosition({ lng: longitude, lat: latitude });
                mapRef.current.setCenter([longitude, latitude]);
                marker.setLngLat([longitude, latitude]);
            });
        };

        updatePosition(); // Initial position update

        // Update the position every 1 second
        const intervalId = setInterval(updatePosition, 1000);

        // Clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div
            style={{ height: '100%', width: '100%' }}
            ref={mapContainerRef}
            className="map-container"
        />
    );
};

export default LiveTracking;

