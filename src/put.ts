import { IncomingMessage, ServerResponse } from 'http';
import { validate as validateId } from 'uuid';
import { parseBody, sendResponse } from './utils';
import { db, User } from './db';

export const put = async (
  id: string,
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const isValidId = validateId(id);

  if (!isValidId) {
    sendResponse(
      res,
      400,
      JSON.stringify({ message: `User id ${id} is invalid` }),
    );
    return;
  }

  let data = null;

  try {
    data = await parseBody(req);
  } catch {
    sendResponse(res, 500, `Server error`);
    return;
  }

  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    sendResponse(
      res,
      400,
      'User must contain fields {  username: string, age: number, hobbies: string[]}',
    );
    return;
  }

  const isValid = validate(data as Record<string, unknown>);

  if (!isValid) {
    sendResponse(
      res,
      400,
      'User must contain fields {  username: string, age: number, hobbies: string[]}',
    );
    return;
  }

  const user = { ...data, id } as User;
  db.set(id, user);

  sendResponse(res, 200, JSON.stringify(db.get(id)), {
    'Content-Type': 'application/json',
  });
};

const fields: Record<string, string> = {
  username: 'string',
  age: 'number',
  hobbies: 'array',
};

const validate = (data: Record<string, unknown>) => {
  if (!data) {
    return false;
  }

  return Object.entries(fields).every(([fieldName, fieldType]) => {
    if (!data.hasOwnProperty(fieldName)) {
      return false;
    }

    if (fieldType !== 'array' && typeof data[fieldName] !== fieldType) {
      return false;
    }

    if (fieldType === 'array' && !Array.isArray(data[fieldName])) {
      return false;
    }

    if (
      fieldType === 'array' &&
      Array.isArray(data[fieldName]) &&
      !data[fieldName].every((item) => typeof item === 'string')
    ) {
      return false;
    }

    return true;
  });
};
