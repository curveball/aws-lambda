import { Application, Context, MemoryRequest, MemoryResponse } from '@curveball/core';
import { Context as AwsContext, APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import qs from 'querystring';
import { convertBody, convertHeaders } from './util';

export default function lambdaHandler(app: Application): APIGatewayProxyHandler {

  return async (awsEvent:APIGatewayProxyEvent, awsContext: AwsContext): Promise<APIGatewayProxyResult> => {

    const request = new MemoryRequest(
      awsEvent.httpMethod,
      awsEvent.path + '?' + qs.stringify(awsEvent.multiValueQueryStringParameters ?? undefined),
      awsEvent.headers,
      awsEvent.isBase64Encoded ? Buffer.from(awsEvent.body ?? '', 'base64') : awsEvent.body,
    );
    const response = new MemoryResponse();
    const context = new Context(request, response) ;
    context.aws = { context: awsContext, event: awsEvent };

    await app.handle(context);

    const [isBase64Encoded, body] = convertBody(context.response);

    const headers: {[key:string]:string} = {};
    for(const [name, val] of Object.entries(response.headers.getAll())) {
      if (typeof val === 'number') {
        headers[name] = val.toString();
      } else if (Array.isArray(val)) {
        headers[name] = val.join(',');
      } else {
        headers[name] = val;
      }
    }

    return {
      isBase64Encoded,
      statusCode: context.response.status,
      headers: headers,
      multiValueHeaders: convertHeaders(context.response),
      body
    };

  };

}
