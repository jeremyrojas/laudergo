'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Circle, MapPin, MoreVertical, Search, ArrowUpDown } from 'lucide-react';
import { Autocomplete } from '@react-google-maps/api';
import { mockRoutes } from '@/lib/mockRoutes';

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
  const [showRoutes, setShowRoutes] = useState(false);

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
    setShowRoutes(true);
  };

  const handleSwapLocations = () => {
    const tempStart = startLocation;
    const tempEnd = endLocation;
    setStartLocation(tempEnd);
    setEndLocation(tempStart);
  };

  return (
    <div className="absolute top-4 left-4 z-10 w-[360px] font-sans">
      <Card className="bg-white border-[#E5E7EB] rounded-lg shadow-[0_4px_6px_rgba(0,0,0,0.1)]">
        <CardContent className="p-6 space-y-4">
          <h1 className="text-2xl font-bold text-center text-[#0052A5] mb-4">LauderGO!</h1>
          
          <div className="relative flex items-center">
            <div className="absolute left-4 flex flex-col items-center gap-1">
              <Circle className="h-5 w-5 text-[#6B7280]" />
              <MoreVertical className="h-5 w-5 text-[#6B7280]" />
              <MapPin className="h-5 w-5 text-[#6B7280]" />
            </div>
            <div className="flex-1 space-y-4 mx-12">
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
                  className="w-full px-3 py-2 text-base text-[#374151] placeholder:text-[#6B7280] border border-[#E5E7EB] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#0052A5] focus:border-[#0052A5] transition-all duration-200"
                  defaultValue={startLocation?.address || ''}
                />
              </Autocomplete>

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
                  className="w-full px-3 py-2 text-base text-[#374151] placeholder:text-[#6B7280] border border-[#E5E7EB] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#0052A5] focus:border-[#0052A5] transition-all duration-200"
                  defaultValue={endLocation?.address || ''}
                />
              </Autocomplete>
            </div>
            <button
              onClick={handleSwapLocations}
              className="absolute right-4 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              aria-label="Swap locations"
            >
              <ArrowUpDown className="h-5 w-5 text-[#6B7280]" />
            </button>
          </div>

          <button 
            className="w-full bg-[#F26522] hover:bg-[#E55511] text-white py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 shadow-[0_1px_3px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_6px_rgba(0,0,0,0.1)] disabled:opacity-50 disabled:cursor-not-allowed font-medium text-base"
            onClick={handleFindRoutes}
            disabled={!startLocation || !endLocation}
          >
            <Search className="h-5 w-5" />
            Find Routes
          </button>

          {showRoutes && (
            <div className="mt-4 space-y-4">
              <div className="p-4 border border-[#E5E7EB] rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-medium">2:05 PM—2:25 PM</span>
                    <span className="text-[#6B7280]">30 min</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#0052A5] text-white text-sm font-medium">
                    1
                  </div>
                  <span className="text-sm text-[#6B7280]">RECOMMENDED ROUTE</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 