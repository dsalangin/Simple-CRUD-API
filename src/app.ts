import { createServer } from 'http';
import 'dotenv/config';

const { log } = console;

const port = process.env.PORT || 3000;

log(process.env.PORT);

export const init = () => {
  const server = createServer(async (req, res) => {
    log(req);
    res.end('Success');
  });

  server.listen(port, () => {
    log(`http://localhost:${port}`);
  });
};
