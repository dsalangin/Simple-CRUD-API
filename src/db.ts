export const db = new Map<string, User>();
db.set('ffc0eaf9-0a05-4ba6-9bda-a83963a49a98', {
  id: 'ffc0eaf9-0a05-4ba6-9bda-a83963a49a98',
  username: 'string',
  age: 123,
  hobbies: [],
});

type User = {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
};
