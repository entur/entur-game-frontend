import { GetTripInfoQuery } from './graphql'

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = `
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
`
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
    source: `
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
`,
): GetTripInfoQuery

export function graphql(source: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (documents as any)[source] ?? {}
}
