import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AttributeType, ITable, Table } from 'aws-cdk-lib/aws-dynamodb';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import path = require('path');
import { existsSync } from 'fs';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Action } from 'aws-cdk-lib/aws-codepipeline';
import {
  Cors,
  LambdaIntegration,
  ResourceOptions,
  RestApi,
} from 'aws-cdk-lib/aws-apigateway';
import { HTTP_METHOD } from '../src/util/util';

export class AwsCdkStack extends cdk.Stack {
  private table: Table;
  private lambda: NodejsFunction;
  private api: RestApi;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambdaPath = path.join(
      __dirname,
      '..',
      'src',
      'lambdas',
      'skills_lambda',
      'handler.ts'
    );

    if (!this.isPathValid(lambdaPath)) {
      console.log('failed to continue with deployment');
      return;
    }

    //create table for jobs and skills and profile
    this.table = new Table(this, 'skilltable', {
      tableName: 'emiskillstable',
      partitionKey: {
        name: 'id',
        type: AttributeType.STRING,
      },
    });

    //create lambda for CRUD operations
    this.lambda = new NodejsFunction(this, 'emiskillslambda', {
      functionName: 'emiskillslambda',
      runtime: Runtime.NODEJS_20_X,
      entry: lambdaPath,
      handler: 'handler',
      environment: {
        TABLE_NAME: this.table.tableName,
      },
    });

    //attach policies to lambda to access the table
    this.lambda.addToRolePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        resources: [this.table.tableArn],
        actions: ['*'],
      })
    );
    //create api gateway /get profile/ set profile
    this.api = new RestApi(this, 'emiskillsapi');
    const optionsWithCors: ResourceOptions = {
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: Cors.ALL_METHODS,
      },
    };

    const apiResources = this.api.root.addResource('skills', optionsWithCors);
    const lambdaIntegration = new LambdaIntegration(this.lambda);
    apiResources.addMethod(HTTP_METHOD.GET, lambdaIntegration);
    apiResources.addMethod(HTTP_METHOD.POST, lambdaIntegration);
  }

  private isPathValid(path: string): boolean {
    if (existsSync(path)) {
      console.log('EXISTS', path);
      return true;
    }
    console.log('FAILED TO FIND', path);
    return false;
  }
}
