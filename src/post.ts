import { IncomingMessage, ServerResponse } from 'http';
import { v4 as uuidv4 } from 'uuid';
import { parseBody, sendResponse } from './utils';
import { db, User } from './db';

export const post = async (req: IncomingMessage, res: ServerResponse) => {
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

  const id = uuidv4();
  const user = { id, ...data } as User;

  db.set(id, user);

  sendResponse(res, 201, JSON.stringify(user), {
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
