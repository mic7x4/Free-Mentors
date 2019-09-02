import express from 'express';
import usersRouter from './server/routes/usersRoutes';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1', usersRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
export default app;
