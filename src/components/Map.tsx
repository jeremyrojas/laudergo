'use client';

import React, { useState, useCallback } from 'react';
import { useLoadScript, GoogleMap, Libraries, DirectionsRenderer } from '@react-google-maps/api';
import RouteSearch from './RouteSearch';

const libraries: Libraries = ['places'];

const FORT_LAUDERDALE_CENTER = {
  lat: 26.1224,
  lng: -80.1373
} as const;

const mapOptions: google.maps.MapOptions = {
  disableDefaultUI: false,
  clickableIcons: true,
  scrollwheel: true,
  mapTypeId: 'roadmap',
  zoomControl: true,
  rotateControl: false,
  scaleControl: true,
  streetViewControl: true,
  panControl: false,
  fullscreenControl: true,
};

// Account for the search card width (360px) plus some padding
const MAP_PADDING = {
  left: 380, // 360px card width + 20px padding
  top: 20,
  right: 20,
  bottom: 20
};

interface Location {
  lat: number;
  lng: number;
  address: string;
}

export default function Map() {
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
    libraries,
  });

  const handleRouteSelect = useCallback(async (start: Location | null, end: Location | null) => {
    if (!start || !end || !window.google) return;

    const directionsService = new google.maps.DirectionsService();

    try {
      const result = await directionsService.route({
        origin: { lat: start.lat, lng: start.lng },
        destination: { lat: end.lat, lng: end.lng },
        travelMode: google.maps.TravelMode.DRIVING,
      });

      setDirections(result);

      // Fit the map bounds to show the entire route with padding
      if (map && result.routes[0]?.bounds) {
        map.fitBounds(result.routes[0].bounds, MAP_PADDING);
      }
    } catch (error) {
      console.error('Error fetching directions:', error);
    }
  }, [map]);

  const handleMapLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
    // Set initial padding
    map.setOptions({
      padding: MAP_PADDING
    });
  }, []);

  if (loadError) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)] text-red-500">
        Error loading maps
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        Loading maps...
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-4rem)] w-full relative">
      <RouteSearch onRouteSelect={handleRouteSelect} />
      <GoogleMap
        options={mapOptions}
        zoom={14}
        center={FORT_LAUDERDALE_CENTER}
        mapContainerClassName="w-full h-full"
        onLoad={handleMapLoad}
      >
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </div>
  );
} 