import express from 'express';
import { sequelize } from './db/index.js';

import cors from 'cors';
import { router } from './api/index.js';
import { errorHandler } from './middleware/errorHandlingMiddleware.js';

const PORT = process.env.PORT || 5002;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', router);

app.use(errorHandler);

app.get('/',(req, res)=>{
  res.status(200).json( { message: 'Working!'});
})
async function startApp() {
  try {
    await sequelize.authenticate();
    // reset
    // await sequelize.sync({ force: true });
    // create
    await sequelize.sync();

    app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT))
  } catch (e) {
      console.log(e)
  }
}

startApp()