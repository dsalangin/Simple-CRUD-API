import { IncomingMessage, ServerResponse } from 'http';
import { parseRequest } from './utils';

const { log } = console;

export const router = (req: IncomingMessage, res: ServerResponse) => {
  if (!req.url || req.url === '/favicon.ico') {
    return;
  }

  if (!req.url.startsWith('/api/users')) {
    res.statusCode = 404;
    res.end('Bad request');
    return;
  }

  const reqObj = parseRequest(req);

  if (!reqObj) {
    return;
  }

  switch (reqObj.method) {
    case 'GET':
      break;

    case 'POST ':
      break;

    case 'PUT ':
      break;

    case 'DELETE ':
      break;

    default:
      break;
  }
  log(req.url.startsWith('/api/users'));
  res.end('Success');
};
