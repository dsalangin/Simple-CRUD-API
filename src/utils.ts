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
    method,
    entity,
    id,
  };
};

export const sendResponse = (
  res: ServerResponse,
  statusCode: number,
  content: string,
  header?: Record<string, string>,
) => {
  res.writeHead(statusCode, header);
  res.end(content);
};

export const parseBody = (req: IncomingMessage) => {
  return new Promise((resolve, reject) => {
    const body: Buffer[] = [];

    req.on('data', (chunk: Buffer) => {
      body.push(chunk);
    });

    req.on('end', () => {
      const result = Buffer.concat(body).toString();

      try {
        resolve(JSON.parse(result));
      } catch (err) {
        reject(err);
      }
    });

    req.on('error', reject);
  });
};

export const getDefaultPort = () => 3000;
