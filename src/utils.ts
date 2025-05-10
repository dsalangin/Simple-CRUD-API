import { IncomingMessage, ServerResponse } from 'http';

export type ParsedRequest = {
  method: string;
  entity: string | undefined;
  id: string | undefined;
};

export const parseRequest = (req: IncomingMessage) => {
  const { url, method } = req;

  if (!url) {
    return;
  }

  const [, entity, id] = url.replace(/^\//, '').split('/');

  return {
    method: method || 'GET',
    entity,
    id,
  };
};

export const sendResponse = (
  res: ServerResponse,
  statusCode: number,
  content: string,
) => {
  res.statusCode = statusCode;
  res.end(content);
};
