import React from 'react';
import { type RouteCardProps } from './types';

export function RouteCard({ route, isSelected, onClick, onDetailsClick }: RouteCardProps) {
  const hasTransfer = route.segments.length > 1;

  return (
    <div 
      className={`p-4 ${isSelected ? 'border-2 border-[#0052A5]' : 'border border-[#E5E7EB]'} rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer`}
      onClick={onClick}
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
        {hasTransfer && (
          <span className="text-sm text-[#6B7280]">
            {route.numTransfers} transfer
          </span>
        )}
      </div>
      {isSelected && (
        <button 
          className="text-[#0052A5] font-medium text-sm hover:text-[#004080] transition-colors duration-200 drop-shadow-sm"
          onClick={(e) => {
            e.stopPropagation();
            onDetailsClick();
          }}
        >
          Details
        </button>
      )}
    </div>
  );
} 