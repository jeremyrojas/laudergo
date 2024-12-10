import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Route, TimeSlot } from "@/types/schedule"
import { generateTimeSlots } from "@/lib/time-utils"

// This will later come from your database
const MOCK_ROUTE: Route = {
  id: "downtown-beach",
  stops: [
    { name: "Downtown Station", timeFromStart: 0 },
    { name: "Las Olas Blvd", timeFromStart: 10 },
    { name: "A1A & Las Olas", timeFromStart: 20 },
    { name: "Fort Lauderdale Beach", timeFromStart: 30 }
  ],
  durationMinutes: 30
}

interface RouteScheduleProps {
  route?: Route // Will be required when connected to DB
  initialTime?: string
  numberOfSlots?: number
  interval?: number
}

export function RouteSchedule({
  route = MOCK_ROUTE,
  initialTime = "1:55 PM",
  numberOfSlots = 3,
  interval = 20
}: RouteScheduleProps) {
  // Generate time slots - this will be replaced with DB data later
  const timeSlots = generateTimeSlots(initialTime, numberOfSlots, interval, route)
  const [selectedTime, setSelectedTime] = useState(initialTime)
  const currentSlot = timeSlots[selectedTime]

  const lastStop = route.stops[route.stops.length - 1].name
  
  return (
    <div className="p-4">
      {/* Header with time range */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold">
          {selectedTime} - {currentSlot.arrivals[lastStop]}
          <span className="ml-4 text-gray-600">({route.durationMinutes} min)</span>
        </h2>
        <p className="text-gray-600">Departure from: {route.stops[0].name}</p>
      </div>

      {/* Time selector pills */}
      <div className="flex gap-2 mb-6">
        {Object.keys(timeSlots).map((time) => (
          <Button
            key={time}
            variant="outline"
            className={cn(
              "rounded-full",
              selectedTime === time && "bg-primary text-white hover:bg-primary-hover"
            )}
            onClick={() => setSelectedTime(time)}
          >
            {time}
          </Button>
        ))}
      </div>

      {/* Route stops list */}
      <div className="space-y-4">
        {route.stops.map((stop, index) => (
          <div key={stop.name} className="flex justify-between">
            <div>
              <div className="font-medium">{stop.name}</div>
              {index > 0 && (
                <div className="text-sm text-gray-600">
                  Arrives {currentSlot.arrivals[stop.name]}
                </div>
              )}
            </div>
            <div>
              {index === 0 
                ? currentSlot.departure 
                : currentSlot.arrivals[stop.name]
              }
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 text-sm text-gray-600">
        Schedule and stops shown are based on current traffic conditions
      </p>
    </div>
  )
} 