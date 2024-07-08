import { gql } from 'graphql-tag';


export const GET_TRIP_INFO = gql`
  query getTripInfo($from: Location!, $to: Location!, $dateTime: DateTime!) {
    trip(from: $from, to: $to, numTripPatterns: 1, dateTime: $dateTime) {
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
`;
