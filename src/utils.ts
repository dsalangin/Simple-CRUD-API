import { IncomingMessage } from 'http';

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
