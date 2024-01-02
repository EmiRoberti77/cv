import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import {
  HTTP_CODE,
  HTTP_METHOD,
  jsonApiProxyResultResponse,
} from '../../util/util';
import { SkillsService } from './skillsServive';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const skillService = new SkillsService(event);
  switch (event.httpMethod) {
    case HTTP_METHOD.GET:
      return jsonApiProxyResultResponse(HTTP_CODE.OK, {
        message: true,
        body: 'success',
      });
    case HTTP_METHOD.POST:
      return await skillService.post();
    default:
      return jsonApiProxyResultResponse(HTTP_CODE.OK, {
        message: false,
        body: `${event.httpMethod} not supported [supported is GET | POST]`,
      });
  }
};
