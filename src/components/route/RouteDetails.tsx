import { Circle, MapPin } from 'lucide-react';
import { type RouteDetailsProps } from './types';
import { cn } from "@/lib/utils";
import { useState } from 'react';

interface TimeButtonProps {
  time: string;
  isSelected: boolean;
  onClick: () => void;
}

const TimeButton = ({ time, isSelected, onClick }: TimeButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-1 rounded-full text-sm font-medium transition-colors",
        "border border-gray-200 hover:bg-gray-100",
        isSelected && "bg-primary text-white hover:bg-primary-hover border-transparent"
      )}
    >
      {time}
    </button>
  );
};

interface Stop {
  name: string;
  time: string;
  arrivalTime?: string;
}

interface RouteOption {
  departureTime: string;
  arrivalTime: string;
  duration: number;
  stops: Stop[];
}

interface RouteDetailsProps {
  route: RouteOption;
  onBack: () => void;
}

export const RouteDetails = ({ route, onBack }: RouteDetailsProps) => {
  const [selectedTime, setSelectedTime] = useState<string>("1:55 PM");
  
  const departureTimes = ["1:55 PM", "2:15 PM", "2:35 PM", "2:55 PM"];

  return (
    <div className="px-8">
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-6">
          <div className="w-full">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[#374151]">
                {route.departureTime} - {route.arrivalTime}
              </h2>
              <span className="text-lg font-semibold text-[#374151]">
                ({route.duration} min)
              </span>
            </div>
            <span className="text-sm text-[#6B7280]">
              Departure from: {route.stops[0].name}
            </span>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap mb-4">
          {departureTimes.map((time) => (
            <TimeButton
              key={time}
              time={time}
              isSelected={selectedTime === time}
              onClick={() => setSelectedTime(time)}
            />
          ))}
        </div>

        <div className="max-h-[400px] overflow-y-auto pr-2 -ml-8 pl-8 space-y-6">
          <div className="relative">
            <div className="absolute left-[7px] top-[28px] bottom-[44px] w-[2px] bg-[#E5E7EB]" />

            {route.stops.map((stop, index) => {
              const isFirst = index === 0;
              const isLast = index === route.stops.length - 1;
              
              return (
                <div key={index} className="flex items-center gap-4 relative pb-6">
                  <div style={{ width: '16px' }} className="flex-shrink-0">
                    {isFirst && (
                      <Circle className="w-4 h-4 text-[#0052A5] fill-[#0052A5]" />
                    )}
                    {!isFirst && !isLast && (
                      <Circle className="w-4 h-4 text-[#E5E7EB] fill-white" />
                    )}
                    {isLast && (
                      <MapPin className="w-4 h-4 text-[#F26522]" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="font-medium text-[#374151]">
                      {stop.name}
                    </div>
                    {stop.arrivalTime && (
                      <div className="text-sm text-[#6B7280]">
                        Arrives {stop.arrivalTime}
                      </div>
                    )}
                  </div>

                  <div className="text-sm font-medium text-[#374151]">
                    {stop.time}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-xs text-[#6B7280] mt-4">
          Schedule and stops shown are based on current traffic conditions
        </div>
      </div>
    </div>
  );
} 