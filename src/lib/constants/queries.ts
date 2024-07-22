export const tripQuery = `
query getTripInfo($from: Location!, $to: Location!, $dateTime: DateTime!, $modes: Modes!) {
  trip(from: $from, to: $to, numTripPatterns: 1, dateTime: $dateTime, modes: $modes) {
    tripPatterns {
      duration
      legs {
        fromPlace {
          name
        }
        toPlace {
          name
        }
      }
    }
  }
}
`

export const visualSolutionTripQuery = `
query getTripInfo($from: Location!, $to: Location!, $dateTime: DateTime!, $modes: Modes!) {
  trip(from: $from, to: $to, numTripPatterns: 1, dateTime: $dateTime, modes: $modes) {
    tripPatterns {
      expectedStartTime
      duration
      expectedStartTime
      legs {
        id
        expectedStartTime
        duration
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
