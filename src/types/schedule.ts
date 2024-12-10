export interface Stop {
  name: string
  timeFromStart: number // minutes from start
}

export interface Route {
  id: string
  stops: Stop[]
  durationMinutes: number
}

export interface TimeSlot {
  departure: string
  arrivals: Record<string, string>
} 