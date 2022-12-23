import { app } from './api/index.js';
import { sequelize } from './db/index.js';

const PORT = process.env.PORT || 5002;

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

startApp();