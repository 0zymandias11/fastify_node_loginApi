// server.js
const app = require('./app/app');

const start = async () => {
  try {
    await app.listen({ port: 3030, host: '127.0.0.1' });
    console.info(`Server running on http://127.0.0.1:3030`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
