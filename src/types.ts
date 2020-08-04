import { Context as AwsContext, APIGatewayProxyEvent } from 'aws-lambda'

export type KeyMultiValue = {
  [name: string]: string[]
};

declare module "@curveball/core" {
  interface Context {
    aws?: { context: AwsContext, event: APIGatewayProxyEvent }
  }
}
