export const tripQuery = `
query getTripInfo($from: Location!, $to: Location!, $dateTime: DateTime!, $modes: Modes!) {
  trip(from: $from, to: $to, numTripPatterns: 1, dateTime: $dateTime, modes: $modes) {
    tripPatterns {
      duration
      expectedEndTime
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

export const walkingDistanceTripQuery = `
query getTripInfo($from: Location!, $to: Location!, $dateTime: DateTime!, $modes: Modes!) {
  trip(from: $from, to: $to, numTripPatterns: 1, dateTime: $dateTime, modes: $modes) {
    tripPatterns {
      streetDistance
      legs {
        id
        mode
      }
    }
  }
}
`

export const walkOnlyTripQuery = `
query getTripInfo($from: Location!, $to: Location!) {
  trip(from: $from, to: $to, numTripPatterns: 1, modes: {directMode: foot, transportModes: []}) {
    tripPatterns {
      walkTime
    }
  }
}
`
