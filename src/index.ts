import { Application, Context, MemoryRequest, MemoryResponse } from '@curveball/core';
import qs from 'querystring';
import { AwsLambdaHandler, AwsRequest, AwsResponse } from './types';
import { convertBody, convertHeaders } from './util';

export default function lambdaHandler(app: Application): AwsLambdaHandler {

  return async (awsRequest: AwsRequest): Promise<AwsResponse> => {

    const request = new MemoryRequest(
      awsRequest.httpMethod,
      awsRequest.path + '?' + qs.stringify(awsRequest.multiValueQueryStringParameters),
      awsRequest.headers,
      awsRequest.isBase64Encoded ? Buffer.from(awsRequest.body, 'base64') : awsRequest.body,
    );
    const response = new MemoryResponse();
    const context = new Context(request, response);

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

