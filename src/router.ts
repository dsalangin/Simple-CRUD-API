import { IncomingMessage, ServerResponse } from 'http';
import { parseRequest, sendResponse } from './utils';
import { get } from './get';

const { log } = console;

export const router = (req: IncomingMessage, res: ServerResponse) => {
  if (!req.url || req.url === '/favicon.ico') {
    return;
  }

  if (!req.url.startsWith('/api/users')) {
    sendResponse(res, 404, 'Bad request');
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

    case 'POST ':
      break;

    case 'PUT ':
      break;

    case 'DELETE ':
      break;

    default:
      break;
  }
};
