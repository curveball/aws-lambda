export type KeyValue = {
  [name: string]: string
};

export type KeyMultiValue = {
  [name: string]: string[]
};

export type AwsRequest = {
  resource: string,
  path: string,
  httpMethod: string,
  headers: KeyValue,
  multiValueHeaders: KeyMultiValue,
  queryStringParameters: KeyValue,
  multiValueQueryStringParameters: KeyMultiValue,
  pathParameters: KeyValue,
  stageVariables: KeyValue,
  requestContext: {
    accountId: string,
    resourceId: string,
    stage: string,
    requestId: string,
    identity: {
      cognitoIdentityPoolId: null,
      accountId: null,
      cognitoIdentityId: null,
      caller: null,
      apiKey: null,
      sourceIp: string,
      cognitoAuthenticationType: null,
      cognitoAuthenticationProvider: null,
      userArn: null,
      userAgent: string,
      user: null
    }
    resourcePath: string,
    httpMethod: string,
    apiId: string,
  },
  body: string,
  isBase64Encoded: boolean
};

export type AwsResponse = {
  isBase64Encoded: boolean,
  statusCode: number,
  headers: KeyValue,
  multiValueHeaders: KeyMultiValue,
  body: string
};

export type AwsLambdaHandler = (request: AwsRequest) => Promise<AwsResponse>;
