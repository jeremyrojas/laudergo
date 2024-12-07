import { ArrowLeft, Circle, MapPin } from 'lucide-react';
import { type RouteDetailsProps } from './types';

export function RouteDetails({ route }: RouteDetailsProps) {
  return (
    <div className="px-8">
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-[#374151]">
              {route.departureTime} - {route.arrivalTime}
            </h2>
            <span className="text-sm text-[#6B7280]">
              First departure {route.departureTime}
            </span>
          </div>
          <span className="text-lg font-semibold text-[#374151]">
            ({route.duration} min)
          </span>
        </div>

        <div className="max-h-[400px] overflow-y-auto pr-2 space-y-6">
          {/* Timeline container */}
          <div className="relative">
            {/* Vertical line - adjusted to stop before last icon */}
            <div className="absolute left-[7px] top-[28px] bottom-[44px] w-[2px] bg-[#E5E7EB]" />

            {/* Stops */}
            {route.stops.map((stop, index) => {
              const isFirst = index === 0;
              const isLast = index === route.stops.length - 1;
              
              return (
                <div key={index} className="flex items-center gap-4 relative pb-6">
                  {/* Icon container with appropriate spacing */}
                  <div className={`relative z-10 flex items-center justify-center w-4 h-4 bg-white
                    ${isLast ? 'mt-4' : ''}`}>
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

                  {/* Stop details - aligned with adjusted icons */}
                  <div className={`flex-1 ${isLast ? 'mt-4' : ''}`}>
                    <div className="font-medium text-[#374151]">
                      {stop.name}
                    </div>
                    {stop.arrivalTime && (
                      <div className="text-sm text-[#6B7280]">
                        Arrives {stop.arrivalTime}
                      </div>
                    )}
                  </div>

                  {/* Time - aligned with adjusted content */}
                  <div className={`text-sm font-medium text-[#374151] ${isLast ? 'mt-4' : ''}`}>
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