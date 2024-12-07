import { RouteOption } from '@/components/route/types';

export const MOCK_ROUTES: RouteOption[] = [
  {
    id: '1',
    segments: [{
      routeName: 'Beach Link',
      departureTime: '2:05 PM',
      arrivalTime: '2:25 PM',
      stops: [
        'Las Olas Oceanside Park',
        'Las Olas & A1A',
        'Las Olas & Seabreeze',
        'Las Olas & Isle of Venice',
      ],
      schedule: 'Every 30 minutes, Monday to Sunday 9:30AM to 6:40PM',
    }],
    duration: 30,
    departureTime: '2:05 PM',
    arrivalTime: '2:25 PM',
    numTransfers: 0,
  },
  {
    id: '2',
    segments: [
      {
        routeName: 'Downtown Link',
        departureTime: '2:00 PM',
        arrivalTime: '2:25 PM',
        stops: [
          'Central Terminal',
          'Federal Courthouse',
          'Las Olas & SE 3rd Ave',
          'Las Olas & SE 8th Ave',
        ],
        schedule: 'Every 30 minutes, Monday to Friday 7:30AM to 6:00PM',
      },
      {
        routeName: 'Beach Link',
        departureTime: '2:25 PM',
        arrivalTime: '2:45 PM',
        stops: [
          'Las Olas & SE 8th Ave',
          'Las Olas & Isle of Venice',
          'Las Olas & Seabreeze',
          'Las Olas & A1A',
        ],
        schedule: 'Every 30 minutes, Monday to Sunday 9:30AM to 6:40PM',
      }
    ],
    duration: 45,
    departureTime: '2:00 PM',
    arrivalTime: '2:45 PM',
    numTransfers: 1,
  },
];

// Add more mock data as needed
export const ROUTE_SCHEDULES = {
  'Beach Link': 'Monday to Friday 9:30AM to 6:33PM / Saturday 9:30AM to 6:29PM / Sunday 9:30AM to 6:40PM',
  'Las Olas Link': 'Friday 10:00AM to 8:05PM / Saturday 10:00AM to 8:25PM / Sunday 10:00AM to 8:00PM',
  'Downtown Link': 'Monday to Friday 7:30AM to 6:00PM',
  'NW Community Link': 'Monday to Friday 6:20AM to 7:18PM',
  'Neighborhood Link': 'Monday to Friday 8:00AM to 1:19PM',
}; 