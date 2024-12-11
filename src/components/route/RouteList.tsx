import { RouteCard } from './RouteCard';
import { type RouteListProps } from './types';

export const RouteList = ({ 
  routes, 
  selectedRouteIndex, 
  onDetailsClick 
}: RouteListProps) => {
  return (
    <div className="px-8 mt-6 space-y-3">
      {routes.map((route, index) => (
        <RouteCard
          key={index}
          route={route}
          isSelected={selectedRouteIndex === index}
          onClick={() => onDetailsClick(index)}
        />
      ))}
    </div>
  );
}; 