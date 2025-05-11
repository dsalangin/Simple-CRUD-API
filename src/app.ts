import { createServer } from 'http';
import 'dotenv/config';
import { router } from './router';

const { log } = console;

const port = process.env.PORT || 3000;

export const init = () => {
  const server = createServer(async (req, res) => {
    router(req, res);
  });

  server.listen(port, () => {
    log(`Server running: http://localhost:${port}`);
  });
};
