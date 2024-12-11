'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Circle, MapPin, MoreVertical, Search, ArrowUpDown, ArrowLeft } from 'lucide-react';
import { Autocomplete } from '@react-google-maps/api';
import { RouteList } from './RouteList';
import { RouteDetails } from './RouteDetails';
import type { Location } from './types';
import { MOCK_ROUTES } from '@/lib/mockRoutes';
import { RouteCard } from './RouteCard';

// Constants
const BOUNDS = {
  north: 26.2424,
  south: 26.0724,
  east: -80.0723,
  west: -80.2023,
} as const;

// Types
interface LocationInputProps {
  placeholder: string;
  value: string;
  onPlaceSelect: (place: google.maps.places.PlaceResult) => void;
  onInputChange: (value: string) => void;
}

// Components
const LocationIcon = ({ children }: { children: React.ReactNode }) => (
  <div className="w-5 h-5 text-[#6B7280]">{children}</div>
);

const LocationInput = ({ placeholder, value, onPlaceSelect, onInputChange }: LocationInputProps) => {
  const [autocomplete, setAutocomplete] = React.useState<google.maps.places.Autocomplete | null>(null);

  const handlePlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place?.place_id) {
        onPlaceSelect(place);
      }
    }
  };

  return (
    <Autocomplete
      onLoad={(autoComplete) => {
        setAutocomplete(autoComplete);
        autoComplete.setFields([
          'formatted_address',
          'geometry',
          'name',
          'place_id'
        ]);
      }}
      onPlaceChanged={handlePlaceChanged}
      bounds={BOUNDS}
      restrictions={{ country: "us" }}
      options={{
        strictBounds: true
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
  const [showDetails, setShowDetails] = React.useState(false);
  const [departureType, setDepartureType] = React.useState<'now' | 'later'>('now');

  // Add console.logs for debugging
  const handleStartPlaceSelect = (place: google.maps.places.PlaceResult) => {
    console.log('Start location selected');
    console.log('Place:', place);
    
    if (place?.geometry?.location) {
      const location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        address: place.formatted_address || '',
      };
      
      console.log('Start location:', location);
      setStartLocation(location);
      setStartInput(location.address);
      
      // If end location exists, update route
      if (endLocation) {
        console.log('End location exists, updating route');
        onRouteSelect(location, endLocation);
        setShowRoutes(true);
      }
    }
  };

  const handleEndPlaceSelect = (place: google.maps.places.PlaceResult) => {
    console.log('Destination selected');
    console.log('Place:', place);
    
    if (place?.geometry?.location && startLocation) {
      console.log('Valid place and start location exists');
      const endLocation = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        address: place.formatted_address || '',
      };
      
      console.log('End location:', endLocation);
      setEndLocation(endLocation);
      setEndInput(endLocation.address);
      
      // Immediately trigger route search
      console.log('Triggering route search');
      onRouteSelect(startLocation, endLocation);
      setShowRoutes(true);
    }
  };

  // Add useEffect to monitor state changes
  React.useEffect(() => {
    console.log('State updated:', {
      startLocation,
      endLocation,
      showRoutes,
      startInput,
      endInput
    });
  }, [startLocation, endLocation, showRoutes, startInput, endInput]);

  const handleRouteClick = (index: number) => {
    setSelectedRouteIndex(index);
    setShowDetails(true);
  };

  const handleBackToRoutes = () => {
    setShowDetails(false);
  };

  const handleSwapLocations = () => {
    const tempStart = startLocation;
    const tempStartInput = startInput;
    
    setStartLocation(endLocation);
    setEndLocation(tempStart);
    setStartInput(endInput);
    setEndInput(tempStartInput);

    if (startLocation && endLocation) {
      onRouteSelect(endLocation, startLocation);
    }
  };

  const areLocationsSelected = React.useMemo(() => {
    return Boolean(startLocation && endLocation);
  }, [startLocation, endLocation]);

  return (
    <div className="absolute top-4 left-4 z-10 w-[440px] font-sans">
      <Card className="bg-white border-[#E5E7EB] rounded-lg shadow-[0_4px_6px_rgba(0,0,0,0.1)]">
        <CardContent className="p-6">
          {showDetails ? (
            <div className="relative">
              {/* Back button */}
              <button
                onClick={handleBackToRoutes}
                className="absolute -left-2 top-3 p-2 hover:bg-[#F3F4F6] rounded-full transition-colors duration-200"
                aria-label="Back to search"
              >
                <ArrowLeft className="w-5 h-5 text-[#0052A5]" />
              </button>
              
              {/* Minimized Search Display */}
              <div className="px-8 pl-12 mb-6">
                <div className="p-3 border border-[#E5E7EB] rounded-lg bg-[#F3F4F6]">
                  <div className="flex items-center gap-2 text-sm text-[#374151]">
                    <Circle className="w-3 h-3 text-[#6B7280]" />
                    <span className="truncate">{startInput}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#374151] mt-2">
                    <MapPin className="w-3 h-3 text-[#6B7280]" />
                    <span className="truncate">{endInput}</span>
                  </div>
                </div>
              </div>

              {/* Route Details */}
              <RouteDetails 
                route={MOCK_ROUTES[selectedRouteIndex]} 
                onBack={handleBackToRoutes}
              />
            </div>
          ) : (
            <>
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

              {/* Time Selection Buttons */}
              {areLocationsSelected && (
                <div className="mt-3 mb-3 px-8 flex gap-2">
                  <button
                    onClick={() => setDepartureType('now')}
                    className={`flex-1 py-1.5 px-4 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      departureType === 'now'
                        ? 'bg-[#F26522] hover:bg-[#E55511] text-white'
                        : 'border border-[#E5E7EB] hover:bg-[#F3F4F6] text-[#374151]'
                    }`}
                  >
                    Leave Now
                  </button>
                  <button
                    onClick={() => setDepartureType('later')}
                    className={`flex-1 py-1.5 px-4 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      departureType === 'later'
                        ? 'bg-[#F26522] hover:bg-[#E55511] text-white'
                        : 'border border-[#E5E7EB] hover:bg-[#F3F4F6] text-[#374151]'
                    }`}
                  >
                    Depart At
                  </button>
                </div>
              )}

              {/* Route List */}
              {showRoutes && !showDetails && (
                <div className="mt-2 px-8 space-y-3">
                  {MOCK_ROUTES.map((route, index) => (
                    <RouteCard
                      key={index}
                      route={route}
                      isSelected={selectedRouteIndex === index}
                      onClick={() => handleRouteClick(index)}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 