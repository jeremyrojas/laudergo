'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Circle, MapPin, MoreVertical, Search, ArrowUpDown } from 'lucide-react';
import { Autocomplete } from '@react-google-maps/api';

// Constants
const BOUNDS = {
  north: 26.2424,
  south: 26.0724,
  east: -80.0723,
  west: -80.2023,
} as const;

// Types
interface Location {
  lat: number;
  lng: number;
  address: string;
}

interface LocationInputProps {
  placeholder: string;
  value: string;
  onPlaceSelect: (autocomplete: google.maps.places.Autocomplete) => void;
  onInputChange: (value: string) => void;
}

// Components
const LocationIcon = ({ children }: { children: React.ReactNode }) => (
  <div className="w-5 h-5 text-[#6B7280]">
    {children}
  </div>
);

const LocationInput = ({ placeholder, value, onPlaceSelect, onInputChange }: LocationInputProps) => {
  const handleLoad = (autocomplete: google.maps.places.Autocomplete) => {
    autocomplete.addListener('place_changed', () => {
      onPlaceSelect(autocomplete);
    });
  };

  return (
    <Autocomplete
      onLoad={handleLoad}
      bounds={BOUNDS}
      restrictions={{ country: "us" }}
      options={{
        fields: ["formatted_address", "geometry", "name"],
        strictBounds: true,
      }}
    >
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onInputChange(e.target.value)}
        className="w-full px-4 py-3 text-base text-[#374151] placeholder:text-[#6B7280] border border-[#E5E7EB] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#0052A5] focus:border-[#0052A5] transition-all duration-200"
      />
    </Autocomplete>
  );
};

interface RouteSearchProps {
  onRouteSelect: (start: Location | null, end: Location | null) => void;
}

export default function RouteSearch({ onRouteSelect }: RouteSearchProps) {
  const [startLocation, setStartLocation] = React.useState<Location | null>(null);
  const [endLocation, setEndLocation] = React.useState<Location | null>(null);
  const [startInput, setStartInput] = React.useState('');
  const [endInput, setEndInput] = React.useState('');
  const [showRoutes, setShowRoutes] = React.useState(false);
  const [selectedRouteIndex, setSelectedRouteIndex] = React.useState(0);

  const handleStartPlaceSelect = (autocomplete: google.maps.places.Autocomplete) => {
    const place = autocomplete.getPlace();
    if (place?.geometry?.location) {
      const location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        address: place.formatted_address || '',
      };
      setStartLocation(location);
      setStartInput(location.address);
    }
  };

  const handleEndPlaceSelect = (autocomplete: google.maps.places.Autocomplete) => {
    const place = autocomplete.getPlace();
    if (place?.geometry?.location) {
      const location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        address: place.formatted_address || '',
      };
      setEndLocation(location);
      setEndInput(location.address);
    }
  };

  const handleFindRoutes = () => {
    if (startLocation && endLocation) {
      onRouteSelect(startLocation, endLocation);
      setShowRoutes(true);
    }
  };

  const handleSwapLocations = () => {
    setStartLocation(endLocation);
    setEndLocation(startLocation);
    setStartInput(endInput);
    setEndInput(startInput);
  };

  // Check if both locations are actually selected
  const areLocationsSelected = React.useMemo(() => {
    return Boolean(startLocation && endLocation);
  }, [startLocation, endLocation]);

  return (
    <div className="absolute top-4 left-4 z-10 w-[440px] font-sans">
      <Card className="bg-white border-[#E5E7EB] rounded-lg shadow-[0_4px_6px_rgba(0,0,0,0.1)]">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold text-center text-[#0052A5] mb-6">LauderGO!</h1>
          
          <div className="relative px-8">
            {/* Left Icons */}
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1">
              <LocationIcon><Circle /></LocationIcon>
              <LocationIcon><MoreVertical /></LocationIcon>
              <LocationIcon><MapPin /></LocationIcon>
            </div>

            {/* Input Fields */}
            <div className="space-y-4">
              <LocationInput
                placeholder="Choose starting point, or click on the map..."
                value={startInput}
                onPlaceSelect={handleStartPlaceSelect}
                onInputChange={setStartInput}
              />
              <LocationInput
                placeholder="Choose destination..."
                value={endInput}
                onPlaceSelect={handleEndPlaceSelect}
                onInputChange={setEndInput}
              />
            </div>

            {/* Swap Button */}
            <div className="absolute -right-2 top-1/2 -translate-y-1/2">
              <button
                onClick={handleSwapLocations}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                aria-label="Swap locations"
              >
                <LocationIcon><ArrowUpDown /></LocationIcon>
              </button>
            </div>
          </div>

          {/* Search Button - Aligned with input width */}
          <div className="px-8 mt-4">
            <button 
              onClick={handleFindRoutes}
              disabled={!areLocationsSelected}
              className="w-full bg-[#F26522] hover:bg-[#E55511] text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 shadow-[0_1px_3px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_6px_rgba(0,0,0,0.1)] disabled:opacity-50 disabled:cursor-not-allowed font-medium text-base"
            >
              <Search className="h-5 w-5" />
              Find Routes
            </button>
          </div>

          {showRoutes && (
            <div className="px-8 mt-4 space-y-3">
              {/* Best Route Option */}
              <div 
                className={`p-4 ${selectedRouteIndex === 0 ? 'border-2 border-[#0052A5]' : 'border border-[#E5E7EB]'} rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer`}
                onClick={() => setSelectedRouteIndex(0)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-semibold text-[#374151]">2:05 PM—2:25 PM</span>
                  <span className="text-lg font-semibold text-[#374151]">30 min</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-[#0052A5]">Beach Link</span>
                </div>
                {selectedRouteIndex === 0 && (
                  <button 
                    className="text-[#0052A5] font-medium text-sm hover:text-[#004080] transition-colors duration-200 drop-shadow-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    Details
                  </button>
                )}
              </div>

              {/* Alternative Route with Transfer */}
              <div 
                className={`p-4 ${selectedRouteIndex === 1 ? 'border-2 border-[#0052A5]' : 'border border-[#E5E7EB]'} rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer`}
                onClick={() => setSelectedRouteIndex(1)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-semibold text-[#374151]">2:00 PM—2:45 PM</span>
                  <span className="text-lg font-semibold text-[#374151]">45 min</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-[#0052A5]">Downtown Link</span>
                    <span className="text-sm text-[#6B7280]">→</span>
                    <span className="text-sm font-medium text-[#0052A5]">Beach Link</span>
                  </div>
                  <span className="text-sm text-[#6B7280]">1 transfer</span>
                </div>
                {selectedRouteIndex === 1 && (
                  <button 
                    className="text-[#0052A5] font-medium text-sm hover:text-[#004080] transition-colors duration-200 drop-shadow-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    Details
                  </button>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 