'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Circle, MapPin, MoreVertical, Search, ArrowUpDown, ArrowLeft } from 'lucide-react';
import { Autocomplete } from '@react-google-maps/api';
import { RouteDetails } from '@/components/route/RouteDetails';

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

// Add mock route data
const routes = [
  {
    departureTime: "1:55 PM",
    arrivalTime: "2:25 PM",
    duration: 30,
    stops: [
      {
        name: "Downtown Station",
        time: "1:55 PM"
      },
      {
        name: "Las Olas Blvd",
        time: "2:05 PM",
        arrivalTime: "2:05 PM"
      },
      {
        name: "A1A & Las Olas",
        time: "2:15 PM",
        arrivalTime: "2:15 PM"
      },
      {
        name: "Fort Lauderdale Beach",
        time: "2:25 PM",
        arrivalTime: "2:25 PM"
      }
    ]
  },
  {
    duration: 45,
    segments: [
      {
        routeName: "Downtown Link",
        departureTime: "2:00 PM",
        arrivalTime: "2:20 PM",
        schedule: "Every 30 minutes"
      },
      {
        routeName: "Beach Link",
        departureTime: "2:25 PM",
        arrivalTime: "2:45 PM",
        schedule: "Every 30 minutes"
      }
    ]
  }
];

export default function RouteSearch({ onRouteSelect }: RouteSearchProps) {
  const [startLocation, setStartLocation] = React.useState<Location | null>(null);
  const [endLocation, setEndLocation] = React.useState<Location | null>(null);
  const [startInput, setStartInput] = React.useState('');
  const [endInput, setEndInput] = React.useState('');
  const [showRoutes, setShowRoutes] = React.useState(false);
  const [selectedRouteIndex, setSelectedRouteIndex] = React.useState(0);
  const [showDetails, setShowDetails] = React.useState(false);

  // Add console.logs for debugging
  const handleDestinationSelect = (place: google.maps.places.PlaceResult) => {
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

  const handleSwapLocations = () => {
    setStartLocation(endLocation);
    setEndLocation(startLocation);
    setStartInput(endInput);
    setEndInput(startInput);
  };

  const handleRouteClick = (index: number) => {
    setSelectedRouteIndex(index);
    setShowDetails(true);
  };

  // Check if both locations are actually selected
  const areLocationsSelected = React.useMemo(() => {
    return Boolean(startLocation && endLocation);
  }, [startLocation, endLocation]);

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

  return (
    <div className="absolute top-4 left-4 z-10 w-[440px] font-sans">
      <Card className="bg-white border-[#E5E7EB] rounded-lg">
        <CardContent className="p-6">
          {showDetails ? (
            <div className="relative">
              {/* Back button */}
              <button
                onClick={() => setShowDetails(false)}
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
            </div>
          ) : (
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
                  onPlaceSelect={handleDestinationSelect}
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
          )}

          {/* Results Section */}
          {showRoutes && !showDetails && (
            <div className="px-8 mt-6 space-y-3">
              {/* Best Route Option */}
              <div 
                className={`p-4 ${
                  selectedRouteIndex === 0 
                    ? 'border-2 border-[#0052A5]' 
                    : 'border border-[#E5E7EB]'
                } rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer`}
                onClick={() => handleRouteClick(0)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-semibold text-[#374151]">2:05 PM—2:25 PM</span>
                  <span className="text-lg font-semibold text-[#374151]">30 min</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-[#0052A5]">Beach Link</span>
                </div>
              </div>

              {/* Alternative Route with Transfer */}
              <div 
                className={`p-4 ${
                  selectedRouteIndex === 1 
                    ? 'border-2 border-[#0052A5]' 
                    : 'border border-[#E5E7EB]'
                } rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer`}
                onClick={() => handleRouteClick(1)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-semibold text-[#374151]">2:00 PM—2:45 PM</span>
                  <span className="text-lg font-semibold text-[#374151]">45 min</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-[#0052A5]">Downtown Link</span>
                    <span className="text-sm text-[#6B7280]">→</span>
                    <span className="text-sm font-medium text-[#0052A5]">Beach Link</span>
                  </div>
                  <span className="text-sm text-[#6B7280]">1 transfer</span>
                </div>
              </div>
            </div>
          )}

          {/* Details Section */}
          {showDetails && (
            <RouteDetails 
              route={routes[selectedRouteIndex]} 
              onBack={() => setShowDetails(false)} 
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
} 