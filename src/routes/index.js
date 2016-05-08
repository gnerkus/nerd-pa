import { Router } from 'express';
import motRoute from 'routes/mot.route';

export default (app) => {
  const ROUTES = new Router();

  // initialize routes
  motRoute(ROUTES);

  app.use('/api/v1', ROUTES);
};
