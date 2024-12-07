import { ArrowLeft } from 'lucide-react';
import { type RouteDetailsProps } from './types';

export function RouteDetails({ route, onBack }: RouteDetailsProps) {
  return (
    <div className="px-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[#0052A5] font-medium mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to routes
      </button>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-[#374151]">Route Details</h2>
          <span className="text-lg font-semibold text-[#374151]">
            {route.duration} min
          </span>
        </div>
        
        {route.segments.map((segment, index) => (
          <div key={index} className="border border-[#E5E7EB] rounded-lg p-4">
            <h3 className="text-lg font-medium text-[#0052A5] mb-2">
              {segment.routeName}
            </h3>
            <div className="space-y-2 text-sm text-[#374151]">
              <p>Departure: {segment.departureTime}</p>
              <p>Arrival: {segment.arrivalTime}</p>
              <p className="text-[#6B7280]">{segment.schedule}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 