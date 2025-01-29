import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const LiveTracking = () => {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const [currentPosition, setCurrentPosition] = useState({ lat: -3.745, lng: -38.523 });

    useEffect(() => {
        mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [currentPosition.lng, currentPosition.lat],
            zoom: 9
        });

        const marker = new mapboxgl.Marker()
            .setLngLat([currentPosition.lng, currentPosition.lat])
            .addTo(mapRef.current);

        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            console.log('Initial position:', latitude, longitude);
            setCurrentPosition({ lat: latitude, lng: longitude });
            mapRef.current.setCenter([longitude, latitude]);
            marker.setLngLat([longitude, latitude]);
        });

        const watchId = navigator.geolocation.watchPosition((position) => {
            const { latitude, longitude } = position.coords;
            console.log('Updated position:', latitude, longitude);
            setCurrentPosition({ lat: latitude, lng: longitude });
            mapRef.current.setCenter([longitude, latitude]);
            marker.setLngLat([longitude, latitude]);
        });

        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    useEffect(() => {
        const marker = new mapboxgl.Marker()
            .setLngLat([currentPosition.lng, currentPosition.lat])
            .addTo(mapRef.current);

        const updatePosition = () => {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                console.log('Position updated every 10 seconds:', latitude, longitude);
                setCurrentPosition({ lat: latitude, lng: longitude });
                mapRef.current.setCenter([longitude, latitude]);
                marker.setLngLat([longitude, latitude]);
            });
        };

        updatePosition(); // Initial position update

        const intervalId = setInterval(updatePosition, 10000); // Update every 10 seconds

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

