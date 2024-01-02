import { handler } from '../src/lambdas/skills_lambda/handler';
import { HTTP_METHOD } from '../src/util/util';

const httpParam: any = {
  httpMethod: HTTP_METHOD.POST,
  headers: {
    'Content-type': 'application/json',
  },
  body: JSON.stringify({
    id: '123ER',
    type: 'job',
    job_title: 'CTO',
    start_date: '2000-12-1',
    end_date: '2003-12-10',
    order: 1,
    description:
      'worked as CTO of leading tech company.worked as CTO of leading tech company.worked as CTO of leading tech company',
    company_url: 'www.datamotion.ai',
    company: 'Datamotion',
  }),
};

handler(httpParam)
  .then((success) => console.log(success))
  .catch((err) => console.log(err));
