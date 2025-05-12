import { IncomingMessage, ServerResponse } from 'http';
import { parseRequest, sendResponse } from './utils';
import { get } from './get';
import { post } from './post';
import { put } from './put';
import { deleteUser } from './delete';

export const router = (req: IncomingMessage, res: ServerResponse) => {
  if (!req.url || req.url === '/favicon.ico') {
    return;
  }

  if (!req.url.startsWith('/api/users')) {
    sendResponse(res, 404, 'Bad request. You can use /api/users endpoint');
    return;
  }

  const ParsedRequest = parseRequest(req);

  if (!ParsedRequest) {
    return;
  }

  switch (ParsedRequest.method) {
    case 'GET':
      get(ParsedRequest.id, res);
      break;

    case 'POST':
      post(req, res);
      break;

    case 'PUT':
      put(ParsedRequest.id, req, res);
      break;

    case 'DELETE':
      deleteUser(ParsedRequest.id, res);
      break;

    default:
      sendResponse(
        res,
        404,
        'Bad request. Should use GET, POST, PUT, DELETE methods',
      );
      break;
  }
};
