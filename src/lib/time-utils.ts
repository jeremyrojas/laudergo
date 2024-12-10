import { format, addMinutes, parse } from 'date-fns'

export function calculateTimeSlots(baseTime: string, route: Route): TimeSlot {
  // Parse the base time string into a Date object
  const departureTime = parse(baseTime, 'h:mm aa', new Date())
  
  // Calculate arrival times for each stop
  const arrivals: Record<string, string> = {}
  
  route.stops.forEach((stop) => {
    const arrivalTime = addMinutes(departureTime, stop.timeFromStart)
    arrivals[stop.name] = format(arrivalTime, 'h:mm aa')
  })

  return {
    departure: baseTime,
    arrivals
  }
}

export function generateTimeSlots(
  startTime: string,
  numberOfSlots: number,
  interval: number,
  route: Route
): Record<string, TimeSlot> {
  const slots: Record<string, TimeSlot> = {}
  let currentTime = parse(startTime, 'h:mm aa', new Date())

  for (let i = 0; i < numberOfSlots; i++) {
    const timeString = format(currentTime, 'h:mm aa')
    slots[timeString] = calculateTimeSlots(timeString, route)
    currentTime = addMinutes(currentTime, interval)
  }

  return slots
} 