import { ServerResponse } from 'http';
import { sendResponse } from './utils';
import { validate } from 'uuid';
import { db } from './db';

export const get = (id: string | undefined, res: ServerResponse) => {
  if (!id) {
    const users = getAllUsers();
    sendResponse(res, 200, JSON.stringify(users));
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

  const user = getUser(id);

  if (!user) {
    sendResponse(
      res,
      404,
      JSON.stringify({ message: `User with id ${id} not found` }),
    );
    return;
  }

  sendResponse(res, 200, JSON.stringify(user));
};

const getAllUsers = () => {
  return Array.from(db.values());
};

const getUser = (id: string) => {
  return db.get(id);
};
