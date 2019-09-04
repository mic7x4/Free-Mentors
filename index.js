import express from 'express';
import usersRouter from './server/routes/usersRoutes';
import mentorsRouter from './server/routes/mentorsRoutes';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1', usersRouter);
app.use('/api/v1', mentorsRouter);
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
export default app;
