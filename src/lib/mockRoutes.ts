import { RouteOption } from '@/components/route/types';

export const MOCK_ROUTES: RouteOption[] = [
  {
    id: '1',
    departureTime: '2:05 PM',
    arrivalTime: '2:25 PM',
    duration: 30,
    stops: [
      {
        name: 'Las Olas Oceanside Park',
        time: '2:05 PM'
      },
      {
        name: 'Las Olas & A1A',
        time: '2:10 PM',
        arrivalTime: '2:10 PM'
      },
      {
        name: 'Las Olas & Seabreeze',
        time: '2:15 PM',
        arrivalTime: '2:15 PM'
      },
      {
        name: 'Las Olas & Isle of Venice',
        time: '2:25 PM',
        arrivalTime: '2:25 PM'
      }
    ],
    segments: [{
      routeName: 'Beach Link',
      departureTime: '2:05 PM',
      arrivalTime: '2:25 PM',
      schedule: 'Every 30 minutes'
    }],
    numTransfers: 0
  },
  {
    id: '2',
    departureTime: '2:00 PM',
    arrivalTime: '2:45 PM',
    duration: 45,
    stops: [
      {
        name: 'Central Terminal',
        time: '2:00 PM'
      },
      {
        name: 'Federal Courthouse',
        time: '2:10 PM',
        arrivalTime: '2:10 PM'
      },
      {
        name: 'Las Olas & SE 3rd Ave',
        time: '2:15 PM',
        arrivalTime: '2:15 PM'
      },
      {
        name: 'Las Olas & SE 8th Ave',
        time: '2:25 PM',
        arrivalTime: '2:25 PM'
      },
      {
        name: 'Las Olas & Isle of Venice',
        time: '2:35 PM',
        arrivalTime: '2:35 PM'
      },
      {
        name: 'Las Olas & A1A',
        time: '2:45 PM',
        arrivalTime: '2:45 PM'
      }
    ],
    segments: [
      {
        routeName: 'Downtown Link',
        departureTime: '2:00 PM',
        arrivalTime: '2:25 PM',
        schedule: 'Every 30 minutes'
      },
      {
        routeName: 'Beach Link',
        departureTime: '2:25 PM',
        arrivalTime: '2:45 PM',
        schedule: 'Every 30 minutes'
      }
    ],
    numTransfers: 1
  }
];

// Add more mock data as needed
export const ROUTE_SCHEDULES = {
  'Beach Link': 'Monday to Friday 9:30AM to 6:33PM / Saturday 9:30AM to 6:29PM / Sunday 9:30AM to 6:40PM',
  'Las Olas Link': 'Friday 10:00AM to 8:05PM / Saturday 10:00AM to 8:25PM / Sunday 10:00AM to 8:00PM',
  'Downtown Link': 'Monday to Friday 7:30AM to 6:00PM',
  'NW Community Link': 'Monday to Friday 6:20AM to 7:18PM',
  'Neighborhood Link': 'Monday to Friday 8:00AM to 1:19PM',
}; 