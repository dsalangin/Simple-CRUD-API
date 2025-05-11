import { ServerResponse } from 'http';
import { validate } from 'uuid';
import { sendResponse } from './utils';
import { db } from './db';

export const deleteUser = (id: string, res: ServerResponse) => {
  if (!id) {
    sendResponse(
      res,
      400,
      JSON.stringify({ message: `User id ${id} is invalid` }),
    );
    return;
  }

  const isValid = validate(id);

  if (!isValid) {
    sendResponse(
      res,
      400,
      JSON.stringify({ message: `User id ${id} is invalid` }),
    );
    return;
  }

  const isExist = db.has(id);

  if (!isExist) {
    sendResponse(
      res,
      404,
      JSON.stringify({ message: `User with id ${id} not found` }),
    );
    return;
  }

  db.delete(id);

  sendResponse(res, 204, '');
};
