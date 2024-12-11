import React from 'react';
import { type RouteCardProps } from './types';

export const RouteCard = ({ 
  route, 
  isSelected,
  onClick
}: RouteCardProps) => {
  return (
    <div 
      onClick={onClick}
      className={`p-4 ${
        isSelected 
          ? 'border-2 border-[#0052A5]' 
          : 'border border-[#E5E7EB]'
      } rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-lg font-semibold text-[#374151]">
          {route.departureTime}—{route.arrivalTime}
        </span>
        <span className="text-lg font-semibold text-[#374151]">
          {route.duration} min
        </span>
      </div>
      <div className="flex items-center gap-2 mb-2">
        <div className="flex items-center gap-2">
          {route.segments.map((segment, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <span className="text-sm text-[#6B7280]">→</span>
              )}
              <span className="text-sm font-medium text-[#0052A5]">
                {segment.routeName}
              </span>
            </React.Fragment>
          ))}
        </div>
        {route.numTransfers > 0 && (
          <span className="text-sm text-[#6B7280]">
            {route.numTransfers} transfer
          </span>
        )}
      </div>
    </div>
  );
}; 