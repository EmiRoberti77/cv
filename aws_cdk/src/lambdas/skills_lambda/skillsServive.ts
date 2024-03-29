import {
  DynamoDBClient,
  PutItemCommand,
  ScanCommand,
} from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Article, Job, Profile, Skill, skillType } from './model/models';
import { HTTP_CODE, jsonApiProxyResultResponse } from '../../util/util';
import { randomUUID } from 'crypto';
const client = new DynamoDBClient({});
const table = process.env.TABLE_NAME;
export class SkillsService {
  private event: APIGatewayProxyEvent;
  constructor(event: APIGatewayProxyEvent) {
    this.event = event;
  }

  public async get(): Promise<APIGatewayProxyResult> {
    try {
      const response = await client.send(
        new ScanCommand({
          TableName: table,
        })
      );
      return jsonApiProxyResultResponse(HTTP_CODE.OK, {
        message: true,
        body: response.Items?.map((item) => unmarshall(item)),
      });
    } catch (err: any) {
      return jsonApiProxyResultResponse(HTTP_CODE.ERROR, {
        message: false,
        body: err.message,
      });
    }
  }

  public async post(): Promise<APIGatewayProxyResult> {
    if (!this.event.body) {
      return jsonApiProxyResultResponse(HTTP_CODE.BAD_REQUEST, {
        message: false,
        body: 'missing body',
      });
    }
    try {
      const inputData = JSON.parse(this.event.body);
      inputData.id = randomUUID();
      inputData.createdAt = new Date().toISOString();
      switch (inputData.type) {
        case skillType.SKILL:
          return this.addSkill(inputData);
        case skillType.PROFILE:
          return this.addProfile(inputData);
        case skillType.JOB:
          return this.addJob(inputData);
        case skillType.ARTICLE:
          return this.addArticle(inputData);
        default:
          return this.noSkillType();
      }
    } catch (err: any) {
      return jsonApiProxyResultResponse(HTTP_CODE.ERROR, {
        message: false,
        body: err.message,
      });
    }
  }

  private async addArticle(inputData: Article): Promise<APIGatewayProxyResult> {
    return await this.putItem(inputData);
  }

  private async addSkill(inputData: Skill): Promise<APIGatewayProxyResult> {
    return await this.putItem(inputData);
  }

  private async addJob(inputData: Job): Promise<APIGatewayProxyResult> {
    return await this.putItem(inputData);
  }

  private async addProfile(inputData: Profile): Promise<APIGatewayProxyResult> {
    return await this.putItem(inputData);
  }

  private async putItem(
    inputData: Job | Skill | Profile | Article
  ): Promise<APIGatewayProxyResult> {
    try {
      const result = await client.send(
        new PutItemCommand({
          TableName: table,
          Item: marshall(inputData, {
            convertClassInstanceToMap: true,
          }),
        })
      );
      return jsonApiProxyResultResponse(HTTP_CODE.OK, {
        message: true,
        body: result,
      });
    } catch (err: any) {
      return jsonApiProxyResultResponse(HTTP_CODE.ERROR, {
        message: false,
        body: err.message,
      });
    }
  }

  private async noSkillType(): Promise<APIGatewayProxyResult> {
    return jsonApiProxyResultResponse(HTTP_CODE.NOT_FOUND, {
      message: false,
      body: `type element should be ${skillType.JOB} or ${skillType.PROFILE} or ${skillType.SKILL}`,
    });
  }
}
