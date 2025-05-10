export const db = new Map();
db.set('123', {
  name: 'Dima',
});

type User = {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
};
