import { CodegenConfig } from '@graphql-codegen/cli'
 
const config: CodegenConfig = {
  schema: 'src/lib/graphql/schema.graphql',
  documents: ['src/**/*.ts'],
  ignoreNoDocuments: true, 
  config: {
    typesPrefix: 'T',
    documentMode: 'string',
    documentVariableSuffix: 'Query',
    fragmentVariableSuffix: 'Fragment',
    skipTypeName: true,
    enumsAsTypes: true,
    useTypeImports: true,
    scalars: {
        Coordinates: 'Coordinates',
        Date: 'Date',
        DateTime: 'DateTime',
        Duration: 'Duration',
        LocalTime: 'LocalTime',
        Time: 'Time',
        Long: 'Long',
        DoubleFunction: 'DoubleFunction',
    },
    avoidOptionals: {
        field: true,
    },
},
  generates: {
    './src/gql/': {
      preset: 'client'
    }
  }
}
 
export default config