import { RouteCard } from './RouteCard';
import { type RouteListProps } from './types';

export function RouteList({ 
  routes, 
  selectedRouteIndex, 
  onRouteSelect, 
  onDetailsClick 
}: RouteListProps) {
  return (
    <div className="px-8 mt-4 space-y-3">
      {routes.map((route, index) => (
        <RouteCard
          key={route.id}
          route={route}
          isSelected={selectedRouteIndex === index}
          onClick={() => onRouteSelect(index)}
          onDetailsClick={() => onDetailsClick(route)}
        />
      ))}
    </div>
  );
} 