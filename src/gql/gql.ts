/* eslint-disable */
import * as types from './graphql'

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
const documents = {
    '\n  query getTripInfo($from: Location!, $to: Location!, $dateTime: DateTime!) {\n    trip(from: $from, to: $to, numTripPatterns: 1, dateTime: $dateTime) {\n      tripPatterns {\n        duration\n        legs {\n          fromPlace {\n            name\n          }\n          toPlace {\n            name\n          }\n        }\n      }\n    }\n  }\n':
        types.GetTripInfoQuery,
}

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
    source: '\n  query getTripInfo($from: Location!, $to: Location!, $dateTime: DateTime!) {\n    trip(from: $from, to: $to, numTripPatterns: 1, dateTime: $dateTime) {\n      tripPatterns {\n        duration\n        legs {\n          fromPlace {\n            name\n          }\n          toPlace {\n            name\n          }\n        }\n      }\n    }\n  }\n',
): typeof import('./graphql').GetTripInfoQuery

export function graphql(source: string) {
    return (documents as any)[source] ?? {}
}
