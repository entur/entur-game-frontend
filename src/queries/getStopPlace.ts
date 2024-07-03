query ($id: String!) {
    stopPlace(
      id: $id
    ) {
      name
      id
      estimatedCalls {
        expectedDepartureTime
        destinationDisplay {
          frontText
        }
        serviceJourney {
          line {
            publicCode
            transportMode
          }
        }
      }
    }
  }
