export const db = new Map<string, User>();

export type User = UserData & {
  id: string;
};

type UserData = {
  username: string;
  age: number;
  hobbies: string[];
};
