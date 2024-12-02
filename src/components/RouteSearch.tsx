'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Navigation2, Search } from 'lucide-react';
import { Autocomplete } from '@react-google-maps/api';

// Fort Lauderdale bounds
const BOUNDS = {
  north: 26.2424,
  south: 26.0724,
  east: -80.0723,
  west: -80.2023,
};

interface Location {
  lat: number;
  lng: number;
  address: string;
}

interface RouteSearchProps {
  onRouteSelect: (start: Location | null, end: Location | null) => void;
}

export default function RouteSearch({ onRouteSelect }: RouteSearchProps) {
  const [startLocation, setStartLocation] = useState<Location | null>(null);
  const [endLocation, setEndLocation] = useState<Location | null>(null);
  const [startAutocomplete, setStartAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [endAutocomplete, setEndAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

  const onStartPlaceChanged = () => {
    const place = startAutocomplete?.getPlace();
    if (place?.geometry?.location) {
      setStartLocation({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        address: place.formatted_address || '',
      });
    }
  };

  const onEndPlaceChanged = () => {
    const place = endAutocomplete?.getPlace();
    if (place?.geometry?.location) {
      setEndLocation({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        address: place.formatted_address || '',
      });
    }
  };

  const handleFindRoutes = () => {
    onRouteSelect(startLocation, endLocation);
  };

  return (
    <div className="absolute top-4 left-4 z-10 w-[360px] font-sans">
      <Card className="bg-white border-[#E5E7EB] rounded-lg shadow-[0_4px_6px_rgba(0,0,0,0.1)]">
        <CardContent className="p-4 space-y-4">
          <div className="relative">
            <div className="absolute left-3 top-3 pointer-events-none">
              <MapPin className="h-5 w-5 text-[#6B7280]" />
            </div>
            <Autocomplete
              onLoad={setStartAutocomplete}
              onPlaceChanged={onStartPlaceChanged}
              bounds={BOUNDS}
              restrictions={{ country: "us" }}
              options={{
                fields: ["formatted_address", "geometry", "name"],
                strictBounds: true,
              }}
            >
              <input
                type="text"
                placeholder="Choose starting point, or click on the map..."
                className="w-full pl-10 pr-4 py-2 text-[#374151] placeholder:text-[#6B7280] border border-[#E5E7EB] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#0052A5] focus:border-[#0052A5] transition-all duration-200 text-base"
              />
            </Autocomplete>
          </div>

          <div className="relative">
            <div className="absolute left-3 top-3 pointer-events-none">
              <Navigation2 className="h-5 w-5 text-[#6B7280]" />
            </div>
            <Autocomplete
              onLoad={setEndAutocomplete}
              onPlaceChanged={onEndPlaceChanged}
              bounds={BOUNDS}
              restrictions={{ country: "us" }}
              options={{
                fields: ["formatted_address", "geometry", "name"],
                strictBounds: true,
              }}
            >
              <input
                type="text"
                placeholder="Choose destination..."
                className="w-full pl-10 pr-4 py-2 text-[#374151] placeholder:text-[#6B7280] border border-[#E5E7EB] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#0052A5] focus:border-[#0052A5] transition-all duration-200 text-base"
              />
            </Autocomplete>
          </div>

          <button 
            className="w-full bg-[#F26522] hover:bg-[#E55511] text-white py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 shadow-[0_1px_3px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_6px_rgba(0,0,0,0.1)] disabled:opacity-50 disabled:cursor-not-allowed font-medium text-base"
            onClick={handleFindRoutes}
            disabled={!startLocation || !endLocation}
          >
            <Search className="h-5 w-5" />
            Find Routes
          </button>
        </CardContent>
      </Card>
    </div>
  );
} 