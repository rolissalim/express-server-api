import { config } from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  config();
}
// call after config() to access the env variables
// import { app } from './api';

import App from "./app";
import { AppDataSource } from './database/data-source';

const port = process.env.PORT || 3333;

AppDataSource.initialize()
  .then(async () => {
    App.start(port);
  })
  .catch((err) => console.error(err));

