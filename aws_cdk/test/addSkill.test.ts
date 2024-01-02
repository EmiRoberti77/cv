import { handler } from '../src/lambdas/skills_lambda/handler';
import { HTTP_METHOD } from '../src/util/util';

const httpParam: any = {
  httpMethod: HTTP_METHOD.POST,
  headers: {
    'Content-type': 'application/json',
  },
  body: JSON.stringify({
    id: '123',
    type: 'skill',
    date: '2023',
    order: 1,
    description: 'programming language',
    skill_name: 'typescript',
  }),
};

handler(httpParam)
  .then((success) => console.log(success))
  .catch((err) => console.log(err));
