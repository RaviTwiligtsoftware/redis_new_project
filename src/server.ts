import express from 'express';
// import session from 'express-session';
// import connectRedis from 'connect-redis';
// import redis from 'redis';
import userRoutes from './Routes/userRoutes';

const app = express();
const PORT = process.env.PORT || 3000;



app.use(express.json());
app.use('/users', userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
