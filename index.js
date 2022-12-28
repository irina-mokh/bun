import express from 'express';
import { sequelize } from './db/index.js';
import cors from 'cors';
import { router } from './router/index.js';
import { errorHandler } from './middleware/errorHandlingMiddleware.js';

const PORT = process.env.PORT || 5002;
const app = express();

let whitelist = ['https://mokh-donut.netlify.app/', 'http://localhost:3000'];
let corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions));
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

startApp();