import express from 'express';
import 'dotenv/config';
import routes from './routes/routes.js';
import home from './routes/home.js'
import admin from './routes/admin.js'

const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use('/api/v1', routes);
app.use('/api/v1/home', home);
app.use('/api/v1/admin', admin);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})