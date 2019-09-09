import express from 'express';
import usersRouter from './server/routes/usersRoutes';
import mentorsRouter from './server/routes/mentorsRoutes';
import sessionsRoute from './server/routes/sessionsRoute';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1', usersRouter);
app.use('/api/v1', mentorsRouter);
app.use('/api/v1', sessionsRoute);
app.use('*', (req, res) => {
  res.status(400).json({
    status: res.statusCode,
    error: 'Incorrect route',
  });
});
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});
app.use((error, req, res) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

export default app;
