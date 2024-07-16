const query = `
query getTripInfo($from: Location!, $to: Location!, $dateTime: DateTime!) {
  trip(from: $from, to: $to, numTripPatterns: 1, dateTime: $dateTime) {
    tripPatterns {
      expectedStartTime
      duration
      walkDistance
      legs {
        mode
        distance
        line {
          id
          publicCode
        }
      }
    }
  }
}
`

export default function RouteSuggestion() {}
