import { APIGatewayProxyResult } from 'aws-lambda';

export function addCorsHeader(arg: APIGatewayProxyResult) {
  if (!arg.headers) {
    arg.headers = {};
  }
  arg.headers['Access-Control-Allow-Origin'] = '*';
  arg.headers['Access-Control-Allow-Methods'] = '*';
}

export const jsonApiProxyResultResponse = (
  statusCode: HTTP_CODE,
  object: any
): APIGatewayProxyResult => {
  const response = {
    statusCode,
    body: JSON.stringify(object),
  };
  addCorsHeader(response);
  return response;
};

export const Messages = {
  notFound: (msg: string) => `${msg} not found`,
};

export enum HTTP_CODE {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  ERROR = 500,
}

export enum ODIN_BE_DB_RDS {
  ODN_TBL_DEMOGRAPHICS = 'odn_tbl_demographics',
}

export enum MODE {
  INSERT_EVENT = 1,
  GET_ALL = 2,
  GET_EVENT_BY_ID = 3,
  GET_BY_DATE = 4,
  NONE = 0,
}

export enum HTTP_METHOD {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  DELETE = 'DELETE',
}
