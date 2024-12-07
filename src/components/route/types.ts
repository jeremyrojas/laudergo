export interface Location {
  lat: number;
  lng: number;
  address: string;
}

export interface RouteSegment {
  routeName: string;
  departureTime: string;
  arrivalTime: string;
  stops: string[];
  schedule: string;
}

export interface RouteOption {
  id: string;
  segments: RouteSegment[];
  duration: number;
  departureTime: string;
  arrivalTime: string;
  numTransfers: number;
}

export interface RouteDetailsProps {
  route: RouteOption;
  onBack: () => void;
}

export interface RouteCardProps {
  route: RouteOption;
  isSelected: boolean;
  onClick: () => void;
  onDetailsClick: () => void;
}

export interface RouteListProps {
  routes: RouteOption[];
  selectedRouteIndex: number;
  onRouteSelect: (index: number) => void;
  onDetailsClick: (route: RouteOption) => void;
} 